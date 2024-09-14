/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation AddSurveyQuestion($surveyId: ID!, $text: String!, $order: Int!, $questionType: QuestionType!, $minValue: Int, $maxValue: Int, $options: [QuestionOptionInput!]) {\n    addSurveyQuestion(surveyId: $surveyId, text: $text, order: $order, questionType: $questionType, options: $options, minValue: $minValue, maxValue: $maxValue) {\n      id\n      text\n      order\n      minValue\n      maxValue\n      questionType\n      options {\n        id\n        text\n        order\n      }\n    }\n  }\n':
    types.AddSurveyQuestionDocument,
  '\n  mutation CreateSurvey($title: String!, $description: String!) {\n    createSurvey(title: $title, description: $description) {\n      id\n      title\n      description\n    }\n  }\n':
    types.CreateSurveyDocument,
  '\n  mutation UpdateSurveyQuestion($id: ID!, $text: String, $questionType: QuestionType, $order: Int, $minValue: Int, $maxValue: Int, $options: [QuestionOptionInput!]) {\n    updateSurveyQuestion(id: $id, text: $text, order: $order, questionType: $questionType, minValue: $minValue, maxValue: $maxValue, options: $options) {\n      id\n      text\n      order\n      minValue\n      maxValue\n      questionType\n      options {\n        id\n        text\n        order\n      }\n    }\n  }\n':
    types.UpdateSurveyQuestionDocument,
  '\n  query GetAllSurveys {\n    surveys {\n      id\n      title\n      description\n      archived\n      createdAt\n      updatedAt\n      visibility\n      isPublished\n      creator {\n        id\n        displayName\n      }\n      questions {\n        id\n      }\n      responses {\n        id\n      }\n    }\n  }\n':
    types.GetAllSurveysDocument,
  '\n  query GetMySurveys {\n    mySurveys {\n      id\n      title\n      description\n      isPublished\n      archived\n      visibility\n      responses {\n        id\n      }\n      questions {\n        id\n      }\n    }\n  }\n':
    types.GetMySurveysDocument,
  '\n  query GetSurvey($id: ID!) {\n    survey(id: $id) {\n      id\n      title\n      description\n      creator {\n        id\n        displayName\n      }\n      isPublished\n      visibility\n      archived\n      createdAt\n      updatedAt\n      questions {\n        id\n        text\n        questionType\n        order\n        minValue\n        maxValue\n        options {\n          id\n          text\n          order\n        }\n      }\n      responses {\n        id\n        createdAt\n        updatedAt\n        answers {\n          id\n          answer\n          answerType\n        }\n      }\n    }\n  }\n':
    types.GetSurveyDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation AddSurveyQuestion($surveyId: ID!, $text: String!, $order: Int!, $questionType: QuestionType!, $minValue: Int, $maxValue: Int, $options: [QuestionOptionInput!]) {\n    addSurveyQuestion(surveyId: $surveyId, text: $text, order: $order, questionType: $questionType, options: $options, minValue: $minValue, maxValue: $maxValue) {\n      id\n      text\n      order\n      minValue\n      maxValue\n      questionType\n      options {\n        id\n        text\n        order\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation AddSurveyQuestion($surveyId: ID!, $text: String!, $order: Int!, $questionType: QuestionType!, $minValue: Int, $maxValue: Int, $options: [QuestionOptionInput!]) {\n    addSurveyQuestion(surveyId: $surveyId, text: $text, order: $order, questionType: $questionType, options: $options, minValue: $minValue, maxValue: $maxValue) {\n      id\n      text\n      order\n      minValue\n      maxValue\n      questionType\n      options {\n        id\n        text\n        order\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateSurvey($title: String!, $description: String!) {\n    createSurvey(title: $title, description: $description) {\n      id\n      title\n      description\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateSurvey($title: String!, $description: String!) {\n    createSurvey(title: $title, description: $description) {\n      id\n      title\n      description\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateSurveyQuestion($id: ID!, $text: String, $questionType: QuestionType, $order: Int, $minValue: Int, $maxValue: Int, $options: [QuestionOptionInput!]) {\n    updateSurveyQuestion(id: $id, text: $text, order: $order, questionType: $questionType, minValue: $minValue, maxValue: $maxValue, options: $options) {\n      id\n      text\n      order\n      minValue\n      maxValue\n      questionType\n      options {\n        id\n        text\n        order\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateSurveyQuestion($id: ID!, $text: String, $questionType: QuestionType, $order: Int, $minValue: Int, $maxValue: Int, $options: [QuestionOptionInput!]) {\n    updateSurveyQuestion(id: $id, text: $text, order: $order, questionType: $questionType, minValue: $minValue, maxValue: $maxValue, options: $options) {\n      id\n      text\n      order\n      minValue\n      maxValue\n      questionType\n      options {\n        id\n        text\n        order\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllSurveys {\n    surveys {\n      id\n      title\n      description\n      archived\n      createdAt\n      updatedAt\n      visibility\n      isPublished\n      creator {\n        id\n        displayName\n      }\n      questions {\n        id\n      }\n      responses {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetAllSurveys {\n    surveys {\n      id\n      title\n      description\n      archived\n      createdAt\n      updatedAt\n      visibility\n      isPublished\n      creator {\n        id\n        displayName\n      }\n      questions {\n        id\n      }\n      responses {\n        id\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetMySurveys {\n    mySurveys {\n      id\n      title\n      description\n      isPublished\n      archived\n      visibility\n      responses {\n        id\n      }\n      questions {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetMySurveys {\n    mySurveys {\n      id\n      title\n      description\n      isPublished\n      archived\n      visibility\n      responses {\n        id\n      }\n      questions {\n        id\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetSurvey($id: ID!) {\n    survey(id: $id) {\n      id\n      title\n      description\n      creator {\n        id\n        displayName\n      }\n      isPublished\n      visibility\n      archived\n      createdAt\n      updatedAt\n      questions {\n        id\n        text\n        questionType\n        order\n        minValue\n        maxValue\n        options {\n          id\n          text\n          order\n        }\n      }\n      responses {\n        id\n        createdAt\n        updatedAt\n        answers {\n          id\n          answer\n          answerType\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetSurvey($id: ID!) {\n    survey(id: $id) {\n      id\n      title\n      description\n      creator {\n        id\n        displayName\n      }\n      isPublished\n      visibility\n      archived\n      createdAt\n      updatedAt\n      questions {\n        id\n        text\n        questionType\n        order\n        minValue\n        maxValue\n        options {\n          id\n          text\n          order\n        }\n      }\n      responses {\n        id\n        createdAt\n        updatedAt\n        answers {\n          id\n          answer\n          answerType\n        }\n      }\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
