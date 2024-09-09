import { gql } from '@apollo/client';

const CreateSurvey = gql`
  mutation CreateSurvey($title: String!, $description: String!) {
    createSurvey(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

export default CreateSurvey;
