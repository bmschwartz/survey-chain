import { PrismaAdapter } from '@auth/prisma-adapter';
import { getAddressFromMessage, getChainIdFromMessage, verifySignature } from '@reown/appkit-siwe';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/lib/prisma';

import type { SIWESession } from '@reown/appkit-siwe';
import type { Provider } from 'next-auth/providers';

interface SessionUser extends User {
  id: string;
  displayName?: string;
  ethereumAddress?: string;
}

declare module 'next-auth' {
  interface Session extends SIWESession {
    chainId: number;
    address: string;
    user: SessionUser;
  }
}

const nextAuthSecret = process.env.AUTH_SECRET;
if (!nextAuthSecret) {
  throw new Error('AUTH_SECRET is not set');
}

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set');
}

const providers: Provider[] = [
  CredentialsProvider({
    name: 'Ethereum',
    credentials: {
      message: {
        label: 'Message',
        type: 'text',
        placeholder: '0x0',
      },
      signature: {
        label: 'Signature',
        type: 'text',
        placeholder: '0x0',
      },
    },
    async authorize(credentials) {
      console.log('DEBUG credentials', credentials);

      try {
        if (!credentials?.message) {
          throw new Error('SiweMessage is required');
        }

        const message = credentials.message as string;
        const signature = credentials.signature as string;

        const address = getAddressFromMessage(message);
        const chainId = getChainIdFromMessage(message);

        const isValid = await verifySignature({ address, message, signature, chainId, projectId });

        if (!isValid) {
          return null;
        }

        let user = await prisma.user.findUnique({
          where: { ethereumAddress: address },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              ethereumAddress: address,
              displayName: address,
            },
          });
        }

        return {
          id: `${chainId}:${address}`,
          userId: user.id,
          address: user.ethereumAddress,
          displayName: user.displayName,
        };
      } catch {
        return null;
      }
    },
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized: async ({ auth }) => {
      console.log('DEBUG authorized callback', auth);
      return !!auth;
    },
    session: async ({ session, token, user }) => {
      console.log('DEBUG session callback', session, token, user);

      if (!token.sub) {
        return session;
      }

      session.user.id = token.id as string;
      session.user.displayName = token.displayName as string;

      const [, chainId, address] = token.sub.split(':');
      if (chainId && address) {
        session.address = address;
        session.chainId = parseInt(chainId, 10);
        session.user.ethereumAddress = address;
      }

      console.log('DEBUG returning session', session);
      return session;
    },
  },
  providers,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
});
