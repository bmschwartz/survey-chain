import '@/auth';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

interface DeleteSurveyQuestionArgs {
  id: string;
}

export const deleteSurveyQuestion = async (_: unknown, { id }: DeleteSurveyQuestionArgs, { session }: GQLContext) => {
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('You must be logged in to delete.');
  }

  const surveyQuestion = await prisma.surveyQuestion.findFirst({
    where: {
      id,
      survey: {
        creatorId: userId,
      },
    },
    include: {
      survey: true,
    },
  });

  if (!surveyQuestion) {
    throw new Error('Survey question not found.');
  }

  if (surveyQuestion.survey.isPublished) {
    throw new Error('Cannot delete a question from a published survey.');
  }

  return await prisma.surveyQuestion.delete({
    where: { id },
  });
};
