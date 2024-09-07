import '@/auth';

import { prisma } from '@/services/prisma';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAllSurveys = async (_: unknown, __: unknown) => {
  return await prisma.survey.findMany({
    where: {
      isPublished: true,
    },
    include: {
      creator: true,
      responses: true,
    },
  });
};
