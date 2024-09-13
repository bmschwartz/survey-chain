import '@/auth';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

interface UpdateSurveyArgs {
  id: string;
  title?: string;
  description?: string;
  visibility?: string;
  isPublished?: boolean;
}

export const updateSurvey = async (_: unknown, { id, ...args }: UpdateSurveyArgs, { session }: GQLContext) => {
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('You must be logged in to update a survey.');
  }

  const survey = await prisma.survey.findFirst({
    where: {
      id,
      creatorId: userId,
    },
  });

  if (!survey) {
    throw new Error('Survey not found.');
  }

  const updateData = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(args).filter(([_, value]) => value !== undefined && value !== null)
  );

  return await prisma.survey.update({
    where: { id },
    data: updateData,
  });
};
