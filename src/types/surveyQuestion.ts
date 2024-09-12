// types/surveyQuestion.ts
import { SurveyQuestion as GQLSurveyQuestion } from '@/graphql/__generated__/graphql';
import { QuestionOption, transformQuestionOption } from './questionOption';
import { QuestionType, transformQuestionType } from './questionType';

export type QuestionId = string | number;

export interface SurveyQuestion {
  id: QuestionId; // Required
  text?: string;
  questionType?: QuestionType;
  order?: number;
  minValue?: number;
  maxValue?: number;
  options?: QuestionOption[];
}

export const transformSurveyQuestion = (graphqlQuestion: GQLSurveyQuestion): SurveyQuestion => ({
  id: graphqlQuestion.id,
  text: graphqlQuestion.text,
  questionType: transformQuestionType(graphqlQuestion.questionType),
  order: graphqlQuestion.order,
  minValue: graphqlQuestion.minValue ?? undefined,
  maxValue: graphqlQuestion.maxValue ?? undefined,
  options: graphqlQuestion.options?.map(transformQuestionOption) || [],
});
