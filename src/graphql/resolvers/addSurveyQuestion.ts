import '@/auth';

import { validateUpsertArgs } from '@/graphql/utils/surveyQuestion';
import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types';
import { UpsertSurveyQuestionArgs } from '../utils/surveyQuestion';

interface AddSurveyQuestionArgs extends UpsertSurveyQuestionArgs {
  surveyId: string;
}

const validateArgs = (args: AddSurveyQuestionArgs): string | null => {
  if (!args.surveyId) {
    return 'Survey ID missing';
  }
  return validateUpsertArgs(args);
};

export const addSurveyQuestion = async (_: unknown, args: AddSurveyQuestionArgs, { session }: GQLContext) => {
  if (!session.user.id) {
    console.error('DEBUG must be logged in');
    throw new Error('You must be logged in to view your surveys.');
  }

  const validationErrors = validateArgs(args);
  if (validationErrors) {
    console.error('validation errors', validationErrors);
    throw new Error(validationErrors);
  }

  const { surveyId, text, questionType, order, minValue, maxValue, options } = args;

  if (await prisma.surveyQuestion.findFirst({ where: { surveyId, order } })) {
    throw new Error('Question with that order already exists');
  }

  return await prisma.surveyQuestion.create({
    data: {
      survey: { connect: { id: surveyId } },
      text,
      order,
      maxValue,
      minValue,
      questionType,
      options: {
        createMany: {
          data: options || [],
        },
      },
    },
    include: {
      options: true,
    },
  });
};
