import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';

import { signInSchema } from '@/lib/zod';
import { prisma } from '@/services/prisma';
import { saltAndHashPassword } from '@/utils/password';

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {} & DefaultSession['user'];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  providers: [
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
            return null; // Explicitly return null if user not found
          }

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
  ],
});
