import { gql } from '../__generated__/gql';

const AddSurveyQuestion = gql(`
  mutation AddSurveyQuestion($surveyId: ID!, $text: String!, $order: Int!, $questionType: QuestionType!, $options: [QuestionOptionInput!]) {
    addSurveyQuestion(surveyId: $surveyId, text: $text, order: $order, questionType: $questionType, options: $options) {
      id
      text
      order
      questionType
      options {
        id
        text
        order
      }
    }
  }
`);

export default AddSurveyQuestion;
