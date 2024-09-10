import { gql } from '../__generated__/gql';

const CreateSurvey = gql(`
  mutation CreateSurvey($title: String!, $description: String!) {
    createSurvey(title: $title, description: $description) {
      id
      title
      description
    }
  }
`);

export default CreateSurvey;
