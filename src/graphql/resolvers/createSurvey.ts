import '@/auth';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

interface CreateSurveyArgs {
  title: string;
  description: string;
}

export const createSurvey = async (_: unknown, { title, description }: CreateSurveyArgs, { session }: GQLContext) => {
  if (!session?.user?.id) {
    throw new Error('You must be logged in to create a survey.');
  }

  return await prisma.survey.create({
    data: {
      title,
      description,
      creator: {
        connect: { id: session.user.id },
      },
    },
    include: {
      creator: true,
    },
  });
};
