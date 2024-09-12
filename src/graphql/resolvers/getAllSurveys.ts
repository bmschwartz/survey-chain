import '@/auth';

import { Visibility } from '@prisma/client';

import { prisma } from '@/lib/prisma';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAllSurveys = async (_: unknown, __: unknown) => {
  return await prisma.survey.findMany({
    where: {
      isPublished: true,
      visibility: Visibility.PUBLIC,
    },
    include: {
      creator: true,
      responses: true,
      questions: {
        include: {
          options: true,
        },
      },
    },
  });
};
