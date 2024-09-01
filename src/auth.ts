import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';

import { signInSchema } from '@/lib/zod';
import { prisma } from '@/services/prisma';
import { saltAndHashPassword } from '@/utils/password';

import type { DefaultSession } from 'next-auth';
import type { Provider } from 'next-auth/providers';

declare module 'next-auth' {
  interface Session {
    user: {} & DefaultSession['user'];
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
        console.log('DEBUG: credentials', credentials);
        if (!credentials) {
          return null;
        }
        console.log('DEBUG parsed credentials', await signInSchema.parseAsync(credentials));
        const { email, password } = await signInSchema.parseAsync(credentials);

        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(password);

        const user = await prisma.user.findUnique({
          where: {
            email,
            credential: {
              hashedPassword: pwHash,
            },
          },
        });

        if (!user) {
          console.log('DEBUG: User not found');
          return null; // Explicitly return null if user not found
        }

        console.log('DEBUG: User found', user);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      } catch (error) {
        if (error instanceof ZodError) {
          return null; // Explicitly return null on validation error
        }

        console.error('Authorization error:', error);
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
      console.log('DEBUG: authorized', auth);
      return !!auth;
    },
  },
  providers,
  pages: {
    signIn: '/sign-in',
  },
});
