import { gql } from '../__generated__/gql';

const GET_ALL_SURVEYS = gql(`
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
`);

export default GET_ALL_SURVEYS;
