import { gql } from '../__generated__/gql';

const AddSurveyQuestion = gql(`
  mutation AddSurveyQuestion($surveyId: ID!, $text: String!, $order: Int!, $questionType: QuestionType!, $minValue: Int, $maxValue: Int, $options: [QuestionOptionInput!]) {
    addSurveyQuestion(surveyId: $surveyId, text: $text, order: $order, questionType: $questionType, options: $options, minValue: $minValue, maxValue: $maxValue) {
      id
      text
      order
      minValue
      maxValue
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
