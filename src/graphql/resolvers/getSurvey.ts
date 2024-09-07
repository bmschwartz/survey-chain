import '@/auth';

import { prisma } from '@/services/prisma';
import { GQLContext } from '@/types/GQLContext';

interface GetSurveyArgs {
  id: string;
}

export const getSurvey = async (_: unknown, { id }: GetSurveyArgs, { session }: GQLContext) => {
  const survey = await prisma.survey.findUnique({
    where: { id },
    include: { creator: true, responses: true, versions: true },
  });

  if (!survey) {
    throw new Error('Survey not found.');
  }

  if (!survey.isPublished && survey.creatorId !== session.user.id) {
    throw new Error('You are not authorized to view this survey.');
  }

  return survey;
};
