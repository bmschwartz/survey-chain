import { gql } from '../__generated__/gql';

const GET_SURVEY = gql(`
  query GetSurvey($id: ID!) {
    survey(id: $id) {
      id
      title
      description
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
    }
  }
`);

export default GET_SURVEY;
