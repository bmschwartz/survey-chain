import { ResponseAnswer as GQLResponseAnswer } from '@/graphql/__generated__/graphql';
import { AnswerType, transformAnswerType } from './answerType';
import { SurveyQuestion, transformSurveyQuestion } from './surveyQuestion';

export interface ResponseAnswer {
  id: string;
  answer?: object;
  answerType?: AnswerType;
  question?: SurveyQuestion;
}

const parseResponseAnswer = (answer: object): object => ({
  ...answer,
});

export const transformResponseAnswer = (graphqlAnswer: GQLResponseAnswer): ResponseAnswer => ({
  id: graphqlAnswer.id,
  answer: parseResponseAnswer(graphqlAnswer.answer),
  answerType: transformAnswerType(graphqlAnswer.answerType),
  question: transformSurveyQuestion(graphqlAnswer.question),
});
