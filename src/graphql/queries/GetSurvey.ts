import { gql } from '@apollo/client';

const GetSurvey = gql`
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
`;

export default GetSurvey;
