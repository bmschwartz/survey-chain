import '@/auth';

import { Visibility } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

interface GetSurveyArgs {
  id: string;
}

export const getSurvey = async (_: unknown, { id }: GetSurveyArgs, { session }: GQLContext) => {
  const survey = await prisma.survey.findUnique({
    where: { id },
    include: {
      creator: true,
      responses: true,
      questions: {
        include: { options: true },
      },
    },
  });

  if (!survey) {
    throw new Error('Survey not found.');
  }

  if (!survey.isPublished && survey.creatorId !== session?.user?.id) {
    throw new Error('You are not authorized to view this survey.');
  } else if (survey.visibility === Visibility.PRIVATE && survey.creatorId !== session?.user?.id) {
    // TODO: This will be updated to check if the user is a collaborator on the survey
    throw new Error('You are not authorized to view this survey.');
  }

  return survey;
};
