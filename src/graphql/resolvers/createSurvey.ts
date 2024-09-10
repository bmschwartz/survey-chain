import '@/auth';

import { Visibility } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

interface CreateSurveyArgs {
  title: string;
  description: string;
}

export const createSurvey = async (_: unknown, { title, description }: CreateSurveyArgs, { session }: GQLContext) => {
  const sessionUser = session?.user;
  if (!sessionUser) {
    throw new Error('You must be logged in to create a survey.');
  }

  return await prisma.survey.create({
    data: {
      title,
      description,
      visibility: Visibility.PRIVATE,
      creator: {
        connect: { id: sessionUser.id },
      },
    },
    include: {
      creator: true,
    },
  });
};
