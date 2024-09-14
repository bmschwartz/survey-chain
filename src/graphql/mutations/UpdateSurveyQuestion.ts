import { gql } from '../__generated__/gql';

const UpdateSurveyQuestion = gql(`
  mutation UpdateSurveyQuestion($id: ID!, $text: String, $questionType: QuestionType, $order: Int, $minValue: Int, $maxValue: Int, $options: [QuestionOptionInput!]) {
    updateSurveyQuestion(id: $id, text: $text, order: $order, questionType: $questionType, minValue: $minValue, maxValue: $maxValue, options: $options) {
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

export default UpdateSurveyQuestion;
