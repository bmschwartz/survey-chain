// import useSWR, { mutate } from 'swr';
import { useQuery } from '@apollo/client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// import { fetcher } from '@/utils/fetcher';
import { getSurvey } from '@/graphql/queries';
import { Question, QuestionType } from '../types';

type ValidationError = string;

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
  validationErrors: ValidationError[];

  addQuestion: (newQuestion: Question) => void;
  updateQuestion: (updatedQuestion: Question) => void;
  deleteQuestion: (id: number) => void;
  selectQuestion: (id: number | null) => void;
  resetNewQuestion: () => Question;
  resetSurvey: () => void;
  saveSurvey: () => Promise<void>;
  setIsAddingNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;

  validateStep: () => Promise<ValidationError[]>;
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
  surveyId?: string;
}

interface SurveyDataResponse {
  title: string;
  description: string;
  questions: Question[];
}

export const SurveyBuilderProvider: React.FC<SurveyBuilderProviderProps> = ({ children, surveyId }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // const { data: survey } = useSWR<SurveyDataResponse>(surveyId ? `/api/surveys/${surveyId}` : null, fetcher, {
  //   onSuccess: (data) => {
  //     setTitle(data.title);
  //     setDescription(data.description);
  //     setQuestions(data.questions);
  //   },
  // });

  console.log('Debug survey', survey);

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
    if (id === null) {
      setIsAddingNewQuestion(true);
      setSelectedQuestion(null);
      return;
    }

    setIsAddingNewQuestion(false);
    setSelectedQuestion(questions.find((q) => q.id === id) || null);
  };

  const validateBasicInformation = (): ValidationError[] => {
    const validationErrors: ValidationError[] = [];
    if (title.trim().length < 5) {
      validationErrors.push('Title must be at least 5 characters');
    }
    if (description.trim().length < 5) {
      validationErrors.push('Description must be at least 5 characters');
    }

    return validationErrors;
  };

  const validateQuestionEditor = (): ValidationError[] => {
    const validationErrors: ValidationError[] = [];
    if (questions.length === 0) {
      validationErrors.push('Please add at least one question');
    }
    if (questions.some((q) => q.text.trim() === '')) {
      validationErrors.push('Please fill out all question text fields');
    }

    return validationErrors;
  };

  const validateSurveyPreview = (): ValidationError[] => {
    return [];
  };

  const validateStep = async (): Promise<ValidationError[]> => {
    let errors: ValidationError[] = [];

    switch (activeStep) {
      case 0:
        errors = validateBasicInformation();
        break;
      case 1:
        errors = validateQuestionEditor();
        break;
      case 2:
        errors = validateSurveyPreview();
        break;
      default:
        errors = [];
        break;
    }

    setValidationErrors(errors);
    return errors;
  };

  const saveSurvey = async () => {
    const surveyData = {
      title,
      description,
      questions,
      isPublished: false,
    };

    // const response = await fetch(`/api/surveys/${surveyId || ''}`, {
    //   method: surveyId ? 'PUT' : 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(surveyData),
    // });

    // if (response.ok) {
    //   const savedSurvey = await response.json();
    //   mutate(`/api/surveys/${savedSurvey.id}`); // Revalidate survey data
    // }
  };

  return (
    <SurveyBuilderContext.Provider
      value={{
        activeStep,
        title,
        description,
        questions,
        validationErrors,
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
        saveSurvey,
        validateStep,
      }}
    >
      {children}
    </SurveyBuilderContext.Provider>
  );
};
