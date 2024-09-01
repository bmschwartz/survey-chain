import { ZodError } from 'zod';

import { signUpSchema } from '@/lib/zod';
import { prisma } from '@/services/prisma';
import { saltAndHashPassword } from '@/utils/password';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate the incoming request body against the sign-up schema
    const { email, password, confirmPassword, displayName } = signUpSchema.parse(req.body);

    // Check if the user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            displayName,
          },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or Display Name already in use' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    // Hash the password
    const hashedPassword = await saltAndHashPassword(password);

    // Create the new user and credential
    const user = await prisma.user.create({
      data: {
        email,
        displayName,
        credential: {
          create: {
            hashedPassword,
          },
        },
      },
    });

    // Respond with the newly created user (excluding the hashed password)
    return res.status(201).json({
      id: user.id,
      email: user.email,
      image: user.image,
      displayName: user.displayName,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid data', errors: error.errors });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}
