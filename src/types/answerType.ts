import { AnswerType as GQLAnswerType } from '@/graphql/__generated__/graphql';

export enum AnswerType {
  FillInTheBlank = 'FILL_IN_THE_BLANK',
  MultiSelect = 'MULTI_SELECT',
  RatingScale = 'RATING_SCALE',
  SingleSelect = 'SINGLE_SELECT',
}

export const transformAnswerType = (graphqlAnswerType?: GQLAnswerType): AnswerType | undefined => {
  return graphqlAnswerType ? (graphqlAnswerType as AnswerType) : undefined;
};
