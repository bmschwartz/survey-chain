import { QuestionOptionInput } from '@/graphql/types';
import { UpsertSurveyQuestionArgs, validateUpsertArgs } from '@/graphql/utils/surveyQuestion';
import { prisma } from '@/lib/prisma';
import { GQLContext } from '@/types';

interface UpdateSurveyQuestionArgs extends UpsertSurveyQuestionArgs {
  id: string;
}

const validateArgs = (args: UpdateSurveyQuestionArgs): string | null => {
  if (!args.id) {
    return 'Question ID missing';
  }

  return validateUpsertArgs(args);
};

const updateOptionsPromises = (questionId: string, options: QuestionOptionInput[]) => {
  return options.map((o) => {
    if (!o.id) {
      return prisma.questionOption.create({
        data: {
          text: o.text,
          order: o.order,
          questionId,
        },
      });
    }

    return prisma.questionOption.update({
      where: { id: o.id },
      data: {
        text: o.text,
        order: o.order,
      },
    });
  });
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

  const { id, text, questionType, order, minValue, maxValue, options } = args;

  const question = await prisma.surveyQuestion.findFirst({
    where: {
      id,
      survey: { creatorId: session.user.id },
    },
  });

  if (!question) {
    throw new Error('Question not found');
  }

  if (options && options.length > 0) {
    await Promise.allSettled(updateOptionsPromises(question.id, options));
  }

  return await prisma.surveyQuestion.update({
    where: { id },
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
