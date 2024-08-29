import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Question, QuestionType } from '../types';

interface SurveyBuilderContextType {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;

  title: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  questions: Question[];
  selectedQuestion: Question | null;
  isAddingNewQuestion: boolean;
  addQuestion: (newQuestion: Question) => void;
  updateQuestion: (updatedQuestion: Question) => void;
  deleteQuestion: (id: number) => void;
  selectQuestion: (id: number | null) => void;
  resetNewQuestion: () => Question;
  resetSurvey: () => void;
  setIsAddingNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyBuilderContext = createContext<SurveyBuilderContextType | undefined>(undefined);

export const useSurveyBuilder = () => {
  const context = useContext(SurveyBuilderContext);
  if (!context) {
    throw new Error('useSurveyBuilder must be used within a SurveyBuilderProvider');
  }
  return context;
};

interface SurveyBuilderProviderProps {
  children: ReactNode;
}

export const SurveyBuilderProvider: React.FC<SurveyBuilderProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const resetSurvey = () => {
    setTitle('');
    setActiveStep(0);
    setQuestions([]);
    setDescription('');
    setSelectedQuestion(null);
  };

  const resetNewQuestion = (): Question => ({
    id: questions.length + 1,
    text: '',
    type: QuestionType.MultipleChoice,
    options: [''], // Initialize with one empty option
  });

  const addQuestion = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q));
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (id: number) => {
    const questionIndex = questions.findIndex((q) => q.id === id);
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);

    if (updatedQuestions.length === 0) {
      setSelectedQuestion(null);
    } else if (questionIndex > 0) {
      setSelectedQuestion(updatedQuestions[questionIndex - 1]);
    } else {
      setSelectedQuestion(updatedQuestions[0]);
    }
  };

  const selectQuestion = (id: number | null) => {
    console.log('setting selected question', id);
    if (id === null) {
      setIsAddingNewQuestion(true);
      setSelectedQuestion(null);
      return;
    }
    setIsAddingNewQuestion(false);
    setSelectedQuestion(questions.find((q) => q.id === id) || null);
  };

  return (
    <SurveyBuilderContext.Provider
      value={{
        activeStep,
        title,
        description,
        questions,
        selectedQuestion,
        isAddingNewQuestion,
        setIsAddingNewQuestion,
        setActiveStep,
        setTitle,
        setDescription,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        selectQuestion,
        resetNewQuestion,
        resetSurvey,
      }}
    >
      {children}
    </SurveyBuilderContext.Provider>
  );
};
