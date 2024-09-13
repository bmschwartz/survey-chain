import '@/auth';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

interface ArchiveSurveyArgs {
  id: string;
}

export const archiveSurvey = async (_: unknown, { id }: ArchiveSurveyArgs, { session }: GQLContext) => {
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('You must be logged in to archive a survey.');
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

  if (survey.archived) {
    throw new Error('Survey already archived.');
  }

  return await prisma.survey.update({
    where: { id },
    data: {
      archived: true,
    },
  });
};
