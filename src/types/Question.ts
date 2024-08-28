export enum QuestionType {
  MultipleChoice = 'multiple-choice',
  FillInTheBlank = 'fill-in-the-blank',
  RatingScale = 'rating-scale',
  Dropdown = 'dropdown',
}

export interface Question {
  id: number; // Unique identifier for the question
  text: string; // The actual question text
  type: QuestionType;
  options?: string[]; // Options for multiple-choice, dropdown, etc.
  required?: boolean; // Whether the question is required
}
