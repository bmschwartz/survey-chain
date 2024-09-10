import '@/auth';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

interface DeleteSurveyQuestionArgs {
  id: string;
}

export const deleteSurveyQuestion = async (_: unknown, { id }: DeleteSurveyQuestionArgs, { session }: GQLContext) => {
  if (!session.user.id) {
    throw new Error('You must be logged in to delete.');
  }

  const surveyQuestion = await prisma.surveyQuestion.findUnique({
    where: { id, survey: { creatorId: session.user.id } },
  });

  if (!surveyQuestion) {
    throw new Error('Survey question not found.');
  }

  return await prisma.surveyQuestion.delete({ where: { id } });
};
