import { gql } from '@apollo/client';

const GetAllSurveys = gql`
  query GetAllSurveys {
    surveys {
      id
      title
      description
      creator {
        id
        displayName
      }
      questions {
        id
      }
    }
  }
`;

export default GetAllSurveys;
