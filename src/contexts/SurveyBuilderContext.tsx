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
  selectedQuestionId: number | null;
  addQuestion: () => void;
  updateQuestion: (updatedQuestion: Question) => void;
  deleteQuestion: (id: number) => void;
  selectQuestion: (id: number) => void;

  resetSurvey: () => void;
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
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const resetSurvey = () => {
    setTitle('');
    setActiveStep(0);
    setQuestions([]);
    setDescription('');
    setSelectedQuestionId(null);
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: '',
      type: QuestionType.MultipleChoice,
      options: [],
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q));
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (id: number) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    setSelectedQuestionId(null);
  };

  const selectQuestion = (id: number) => {
    setSelectedQuestionId(id);
  };

  return (
    <SurveyBuilderContext.Provider
      value={{
        activeStep,
        title,
        description,
        questions,
        selectedQuestionId,
        setActiveStep,
        setTitle,
        setDescription,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        selectQuestion,
        resetSurvey,
      }}
    >
      {children}
    </SurveyBuilderContext.Provider>
  );
};
