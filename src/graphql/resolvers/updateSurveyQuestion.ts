import { UpsertSurveyQuestionArgs, validateUpsertArgs } from '@/graphql/utils/surveyQuestion';
import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types';

interface UpdateSurveyQuestionArgs extends UpsertSurveyQuestionArgs {
  id: string;
  options?: { id: string; text: string; order: number }[];
}

const validateArgs = (args: UpdateSurveyQuestionArgs): string | null => {
  if (!args.id) {
    return 'Question ID missing';
  }

  return validateUpsertArgs(args);
};

export const updateSurveyQuestion = async (_: unknown, args: UpdateSurveyQuestionArgs, { session }: GQLContext) => {
  if (!session.user.id) {
    console.error('DEBUG must be logged in');
    throw new Error('You must be logged in to update your survey question.');
  }

  const validationErrors = validateArgs(args);
  if (validationErrors) {
    console.error('validation errors', validationErrors);
    throw new Error(validationErrors);
  }

  const { id, text, questionType, order, minValue, maxValue } = args;

  for (const option of args.options || []) {
    if (!option.id) {
      throw new Error('Option ID missing');
    }
    // Update the option
    await prisma.questionOption.update({
      where: { id: option.id },
      data: {
        text: option.text,
        order: option.order,
      },
    });
  }

  return await prisma.surveyQuestion.update({
    where: { id, survey: { creatorId: session.user.id } },
    data: {
      text,
      order,
      maxValue,
      minValue,
      questionType,
    },
    include: {
      options: true,
    },
  });
};
