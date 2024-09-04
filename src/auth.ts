import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';

import { signInSchema } from '@/lib/zod';
import { prisma } from '@/services/prisma';
import { comparePassword } from '@/utils/password';

import type { DefaultSession } from 'next-auth';
import type { Provider } from 'next-auth/providers';

declare module 'next-auth' {
  interface Session {
    user: {
      displayName?: string;
    } & DefaultSession['user'];
  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
      try {
        if (!credentials) {
          return null;
        }

        const { email, password } = await signInSchema.parseAsync(credentials);
        const user = await prisma.user.findUnique({ where: { email }, include: { credential: true } });
        const isMatchingPassword = await comparePassword(password, user?.credential?.hashedPassword ?? '');

        if (!user?.credential || !isMatchingPassword) {
          return null; // Explicitly return null if user not found
        }

        return {
          id: user.id,
          email: user.email,
          image: user.image,
          displayName: user.displayName,
        };
      } catch (error) {
        if (error instanceof ZodError) {
          return null; // Explicitly return null on validation error
        }

        return null; // Return null on any other errors
      }
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
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
