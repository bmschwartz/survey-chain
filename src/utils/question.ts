import { QuestionType } from '@/types';

export const questionTypeToDisplay = (type: QuestionType | undefined) => {
  switch (type) {
    case QuestionType.MultiSelect:
      return 'Multiple Select';
    case QuestionType.FillInTheBlank:
      return 'Fill in the Blank';
    case QuestionType.RatingScale:
      return 'Rating Scale';
    case QuestionType.SingleSelect:
      return 'Single Select';
    default:
      return '';
  }
};
