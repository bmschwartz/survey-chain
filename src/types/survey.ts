// types/survey.ts
import { Survey as GQLSurvey } from '@/graphql/__generated__/graphql';
import { SurveyQuestion, transformSurveyQuestion } from './surveyQuestion';
import { SurveyResponse, transformSurveyResponse } from './surveyResponse';
import { transformUser, User } from './user';
import { transformVisibility, Visibility } from './visibility';

export interface Survey {
  id: string; // Required
  title: string;
  description: string;
  creator: User;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  isPublished: boolean;
  archived: boolean;
  visibility?: Visibility;
  createdAt: string;
  updatedAt: string;
}

export const transformSurvey = (graphqlSurvey: GQLSurvey): Survey => {
  return {
    id: graphqlSurvey.id,
    title: graphqlSurvey.title,
    description: graphqlSurvey.description,
    responses: graphqlSurvey.responses?.map(transformSurveyResponse) || [],
    creator: transformUser(graphqlSurvey.creator),
    questions: graphqlSurvey.questions?.map(transformSurveyQuestion) || [],
    isPublished: graphqlSurvey.isPublished,
    archived: graphqlSurvey.archived,
    visibility: graphqlSurvey.visibility ? transformVisibility(graphqlSurvey.visibility) : undefined,
    createdAt: graphqlSurvey.createdAt,
    updatedAt: graphqlSurvey.updatedAt,
  };
};
