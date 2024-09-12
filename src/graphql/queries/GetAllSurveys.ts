import { gql } from '../__generated__/gql';

const GET_ALL_SURVEYS = gql(`
  query GetAllSurveys {
    surveys {
      id
      title
      description
      archived
      createdAt
      updatedAt
      visibility
      isPublished
      creator {
        id
        displayName
      }
      questions {
        id
      }
      responses {
        id
      }
    }
  }
`);

export default GET_ALL_SURVEYS;
