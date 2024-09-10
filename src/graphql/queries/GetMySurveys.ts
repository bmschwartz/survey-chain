import { gql } from '../__generated__/gql';

const GET_MY_SURVEYS = gql(`
  query GetMySurveys {
    mySurveys {
      id
      title
      description
      isPublished
      archived
      visibility
      responses {
        id
      }
      questions {
        id
      }
    }
  }
`);

export default GET_MY_SURVEYS;
