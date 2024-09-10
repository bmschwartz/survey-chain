import '@/auth';

import { QuestionType } from '@prisma/client';
import { isUndefined } from 'lodash';

import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types/GQLContext';

interface AddSurveyQuestionArgs {
  surveyId: string;
  text: string;
  order: number;
  minValue?: number;
  maxValue?: number;
  questionType: QuestionType;
  options?: { text: string; order: number }[];
}

const validateArgs = (args: AddSurveyQuestionArgs): string | null => {
  if (!args.surveyId) {
    return 'Survey ID missing';
  }

  if (args.questionType === QuestionType.RATING_SCALE && (isUndefined(args.minValue) || isUndefined(args.maxValue))) {
    return 'Rating scale requires minValue and maxValue';
  }

  if (!args.text || args.text.length === 0) {
    return 'Question text is required';
  }

  if (isUndefined(args.order)) {
    return 'Order is required';
  }

  if (
    (args.questionType === QuestionType.MULTI_SELECT || args.questionType === QuestionType.SINGLE_SELECT) &&
    (!args.options || args.options.length === 0)
  ) {
    return 'Options are required for MULTI_SELECT and SINGLE_SELECT question types';
  }

  if (args.questionType === QuestionType.FILL_IN_THE_BLANK && args.options && args.options.length > 0) {
    return 'Fill in the blank does not allow for options';
  }

  return null;
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

  console.log('DEBUG creating question');
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
