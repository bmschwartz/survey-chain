import { QuestionType } from '@/types';

export const questionTypeToDisplay = (type: QuestionType) => {
  switch (type) {
    case QuestionType.MultipleChoice:
      return 'Multiple Choice';
    case QuestionType.FillInTheBlank:
      return 'Fill in the Blank';
    case QuestionType.RatingScale:
      return 'Rating Scale';
    case QuestionType.Dropdown:
      return 'Dropdown';
    default:
      return '';
  }
};
