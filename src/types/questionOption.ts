// types/questionOption.ts
import { QuestionOption as GQLQuestionOption } from '@/graphql/__generated__/graphql';

export interface QuestionOption {
  id: string; // Required
  text?: string;
  order?: number;
}

export const transformQuestionOption = (graphqlOption: GQLQuestionOption): QuestionOption => ({
  id: graphqlOption.id,
  text: graphqlOption.text,
  order: graphqlOption.order,
});
