import { ZodError } from 'zod';

import { prisma } from '@/lib/prisma';
import { saltAndHashPassword } from '@/utils/password';
import { signUpSchema } from '@/validators/zod';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, confirmPassword, displayName } = signUpSchema.parse(req.body);

    const where = displayName ? { OR: [{ email }, { displayName }] } : { email };

    const existingUser = await prisma.user.findFirst({ where });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or Display Name already in use' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedPassword = await saltAndHashPassword(password);

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
