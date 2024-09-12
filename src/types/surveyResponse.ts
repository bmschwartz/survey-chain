import { SurveyResponse as GQLSurveyResponse } from '@/graphql/__generated__/graphql';
import { ResponseAnswer, transformResponseAnswer } from './responseAnswer';
import { User } from './user';

export interface SurveyResponse {
  id: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  isComplete: boolean;
  answers: ResponseAnswer[];
}

export const transformSurveyResponse = (response: GQLSurveyResponse): SurveyResponse => {
  return {
    id: response.id,
    user: response.user,
    isComplete: response.isComplete,
    answers: (response.answers || []).map(transformResponseAnswer),
    createdAt: new Date(response.createdAt).toISOString(),
    updatedAt: new Date(response.updatedAt).toISOString(),
    submittedAt: response.submittedAt ? new Date(response.submittedAt).toISOString() : undefined,
  };
};
