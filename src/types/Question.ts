export interface Question {
  id: number; // Unique identifier for the question
  text: string; // The actual question text
  type: 'multiple-choice' | 'fill-in-the-blank' | 'rating-scale' | 'dropdown'; // Type of the question
  options?: string[]; // Options for multiple-choice, dropdown, etc.
  required?: boolean; // Whether the question is required
}
