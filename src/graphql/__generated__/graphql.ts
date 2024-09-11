/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ResponseAnswerData: { input: any; output: any; }
};

export enum AnswerType {
  FillInTheBlank = 'FILL_IN_THE_BLANK',
  MultiSelect = 'MULTI_SELECT',
  RatingScale = 'RATING_SCALE',
  SingleSelect = 'SINGLE_SELECT'
}

export type Mutation = {
  __typename?: 'Mutation';
  addSurveyQuestion: SurveyQuestion;
  archiveSurvey: Survey;
  createSurvey: Survey;
  deleteSurveyQuestion: SurveyQuestion;
  submitSurveyResponse: SurveyResponse;
  updateSurvey: Survey;
  updateSurveyQuestion: SurveyQuestion;
};


export type MutationAddSurveyQuestionArgs = {
  maxValue?: InputMaybe<Scalars['Int']['input']>;
  minValue?: InputMaybe<Scalars['Int']['input']>;
  options?: InputMaybe<Array<QuestionOptionInput>>;
  order: Scalars['Int']['input'];
  questionType: QuestionType;
  surveyId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationArchiveSurveyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateSurveyArgs = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationDeleteSurveyQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitSurveyResponseArgs = {
  answers: Array<ResponseInput>;
  surveyId: Scalars['ID']['input'];
};


export type MutationUpdateSurveyArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<Visibility>;
};


export type MutationUpdateSurveyQuestionArgs = {
  id: Scalars['ID']['input'];
  maxValue?: InputMaybe<Scalars['Int']['input']>;
  minValue?: InputMaybe<Scalars['Int']['input']>;
  options?: InputMaybe<Array<QuestionOptionInput>>;
  order?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  mySurveys: Array<Survey>;
  survey?: Maybe<Survey>;
  surveyResponses: Array<SurveyResponse>;
  surveys: Array<Survey>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QuerySurveyArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySurveyResponsesArgs = {
  surveyId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type QuestionOption = {
  __typename?: 'QuestionOption';
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type QuestionOptionInput = {
  order: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export enum QuestionType {
  FillInTheBlank = 'FILL_IN_THE_BLANK',
  MultiSelect = 'MULTI_SELECT',
  RatingScale = 'RATING_SCALE',
  SingleSelect = 'SINGLE_SELECT'
}

export type ResponseAnswer = {
  __typename?: 'ResponseAnswer';
  answer: Scalars['ResponseAnswerData']['output'];
  answerType: AnswerType;
  id: Scalars['ID']['output'];
  question: SurveyQuestion;
};

export type ResponseInput = {
  answer: Scalars['ResponseAnswerData']['input'];
  answerType: AnswerType;
  questionId: Scalars['ID']['input'];
};

export type Survey = {
  __typename?: 'Survey';
  archived: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  creator: User;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublished: Scalars['Boolean']['output'];
  questions: Array<SurveyQuestion>;
  responses: Array<SurveyResponse>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  visibility: Visibility;
};

export type SurveyQuestion = {
  __typename?: 'SurveyQuestion';
  id: Scalars['ID']['output'];
  maxValue?: Maybe<Scalars['Int']['output']>;
  minValue?: Maybe<Scalars['Int']['output']>;
  options: Array<QuestionOption>;
  order: Scalars['Int']['output'];
  questionType: QuestionType;
  text: Scalars['String']['output'];
};

export type SurveyResponse = {
  __typename?: 'SurveyResponse';
  answers: Array<ResponseAnswer>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isComplete: Scalars['Boolean']['output'];
  submittedAt?: Maybe<Scalars['String']['output']>;
  survey: Survey;
  updatedAt: Scalars['String']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  responses: Array<SurveyResponse>;
  surveys: Array<Survey>;
  updatedAt: Scalars['String']['output'];
};

export enum Visibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateSurveyMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type CreateSurveyMutation = { __typename?: 'Mutation', createSurvey: { __typename?: 'Survey', id: string, title: string, description: string } };

export type GetAllSurveysQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSurveysQuery = { __typename?: 'Query', surveys: Array<{ __typename?: 'Survey', id: string, title: string, description: string, creator: { __typename?: 'User', id: string, displayName: string }, questions: Array<{ __typename?: 'SurveyQuestion', id: string }> }> };

export type GetMySurveysQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMySurveysQuery = { __typename?: 'Query', mySurveys: Array<{ __typename?: 'Survey', id: string, title: string, description: string, isPublished: boolean, archived: boolean, visibility: Visibility, responses: Array<{ __typename?: 'SurveyResponse', id: string }>, questions: Array<{ __typename?: 'SurveyQuestion', id: string }> }> };

export type GetSurveyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSurveyQuery = { __typename?: 'Query', survey?: { __typename?: 'Survey', id: string, title: string, description: string, creator: { __typename?: 'User', id: string }, questions: Array<{ __typename?: 'SurveyQuestion', id: string, text: string, questionType: QuestionType, order: number, minValue?: number | null, maxValue?: number | null, options: Array<{ __typename?: 'QuestionOption', id: string, text: string, order: number }> }> } | null };


export const CreateSurveyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSurvey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSurvey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CreateSurveyMutation, CreateSurveyMutationVariables>;
export const GetAllSurveysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllSurveys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surveys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllSurveysQuery, GetAllSurveysQueryVariables>;
export const GetMySurveysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMySurveys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mySurveys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetMySurveysQuery, GetMySurveysQueryVariables>;
export const GetSurveyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSurvey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"survey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"minValue"}},{"kind":"Field","name":{"kind":"Name","value":"maxValue"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSurveyQuery, GetSurveyQueryVariables>;