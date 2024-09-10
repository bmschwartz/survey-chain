import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';

import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/utils/password';
import { signInSchema } from '@/validators/zod';

import type { User } from 'next-auth';
import type { Provider } from 'next-auth/providers';

interface SessionUser extends User {
  displayName?: string;
}

declare module 'next-auth' {
  interface Session {
    user: SessionUser;
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, user }: { token: any; user: SessionUser }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
        token.displayName = user.displayName as string;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.userId = token.id as string;
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.displayName = token.displayName as string;

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
