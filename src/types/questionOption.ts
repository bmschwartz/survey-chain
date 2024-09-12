import { QuestionOption as GQLQuestionOption } from '@/graphql/__generated__/graphql';

type QuestionOptionId = string | number;

export interface QuestionOption {
  id: QuestionOptionId; // Required
  text?: string;
  order?: number;
}

export const transformQuestionOption = (graphqlOption: GQLQuestionOption): QuestionOption => ({
  id: graphqlOption.id,
  text: graphqlOption.text,
  order: graphqlOption.order,
});
