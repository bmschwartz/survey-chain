import { isUndefined } from 'lodash';

import { QuestionOptionInput, QuestionType } from '@/graphql/types';

export interface UpsertSurveyQuestionArgs {
  text: string;
  order: number;
  minValue?: number;
  maxValue?: number;
  questionType: QuestionType;
  options?: QuestionOptionInput[];
}

export const validateUpsertArgs = (args: UpsertSurveyQuestionArgs): string | null => {
  if (args.questionType === QuestionType.RatingScale && (isUndefined(args.minValue) || isUndefined(args.maxValue))) {
    return 'Rating scale requires minValue and maxValue';
  }

  if (
    (args.questionType === QuestionType.MultiSelect || args.questionType === QuestionType.SingleSelect) &&
    (!args.options || args.options.length === 0)
  ) {
    return 'Options are required for MULTI_SELECT and SINGLE_SELECT question types';
  }

  if (args.questionType === QuestionType.FillInTheBlank && args.options && args.options.length > 0) {
    return 'Fill in the blank does not allow for options';
  }

  return null;
};
