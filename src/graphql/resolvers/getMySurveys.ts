import '@/auth';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

export const getMySurveys = async (_: unknown, {}, { session }: GQLContext) => {
  if (!session.user.id) {
    throw new Error('You must be logged in to view your surveys.');
  }

  return await prisma.survey.findMany({
    where: { creatorId: session.user.id },
    include: { responses: true, questions: true },
  });
};
