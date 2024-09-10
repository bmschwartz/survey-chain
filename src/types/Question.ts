export enum QuestionType {
  RatingScale = 'RATING_SCALE',
  MultiSelect = 'MULTI_SELECT',
  SingleSelect = 'SINGLE_SELECT',
  FillInTheBlank = 'FILL_IN_THE_BLANK',
}

export type QuestionId = string | number;

export interface Question {
  id: string | number; // Unique identifier for the question
  text: string; // The actual question text
  type: QuestionType;
  options?: string[]; // Options for multiple-choice, dropdown, etc.
  required?: boolean; // Whether the question is required
}
