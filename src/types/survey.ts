// types/survey.ts
import { Survey as GQLSurvey } from '@/graphql/__generated__/graphql';
import { SurveyQuestion, transformSurveyQuestion } from './surveyQuestion';
import { transformUser, User } from './user';
import { transformVisibility, Visibility } from './visibility';

export interface Survey {
  id: string; // Required
  title?: string;
  description?: string;
  creator?: User;
  questions?: SurveyQuestion[];
  isPublished?: boolean;
  archived?: boolean;
  visibility?: Visibility;
  createdAt?: string;
  updatedAt?: string;
}

export const transformSurvey = (graphqlSurvey: GQLSurvey): Survey => ({
  id: graphqlSurvey.id,
  title: graphqlSurvey.title,
  description: graphqlSurvey.description,
  creator: graphqlSurvey.creator ? transformUser(graphqlSurvey.creator) : undefined,
  questions: graphqlSurvey.questions?.map(transformSurveyQuestion) || [],
  isPublished: graphqlSurvey.isPublished,
  archived: graphqlSurvey.archived,
  visibility: graphqlSurvey.visibility ? transformVisibility(graphqlSurvey.visibility) : undefined,
  createdAt: graphqlSurvey.createdAt,
  updatedAt: graphqlSurvey.updatedAt,
});
