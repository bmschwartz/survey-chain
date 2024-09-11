// types/questionType.ts
import { QuestionType as GQLQuestionType } from '@/graphql/__generated__/graphql';

export enum QuestionType {
  FillInTheBlank = 'FILL_IN_THE_BLANK',
  MultiSelect = 'MULTI_SELECT',
  RatingScale = 'RATING_SCALE',
  SingleSelect = 'SINGLE_SELECT',
}

export const transformQuestionType = (graphqlQuestionType?: GQLQuestionType): QuestionType | undefined => {
  return graphqlQuestionType ? (graphqlQuestionType as QuestionType) : undefined;
};
