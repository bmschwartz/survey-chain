import { gql } from '../__generated__/gql';

const GET_SURVEY = gql(`
  query GetSurvey($id: ID!) {
    survey(id: $id) {
      id
      title
      description
      creator {
        id
        displayName
      }
      isPublished
      visibility
      archived
      createdAt
      updatedAt
      questions {
        id
        text
        questionType
        order
        minValue
        maxValue
        options {
          id
          text
          order
        }
      }
      responses {
        id
        createdAt
        updatedAt
        answers {
          id
          answer
          answerType
        }
      }
    }
  }
`);

export default GET_SURVEY;
