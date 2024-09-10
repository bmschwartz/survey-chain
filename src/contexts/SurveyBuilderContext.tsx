// import useSWR, { mutate } from 'swr';
import { useMutation, useQuery } from '@apollo/client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

import CreateSurvey from '@/graphql/mutations/CreateSurvey';
import GET_SURVEY from '@/graphql/queries/GetSurvey';
import { Question, QuestionId, QuestionType } from '../types';

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
  deleteQuestion: (id: QuestionId) => void;
  selectQuestion: (id: QuestionId | null) => void;
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

export const SurveyBuilderProvider: React.FC<SurveyBuilderProviderProps> = ({ children, surveyId }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { data: survey } = useQuery(GET_SURVEY, {
    variables: { id: surveyId ?? '' },
    onCompleted: ({ survey }) => {
      if (!survey) {
        return;
      }
      console.log('Got survey data from GetSurvey', survey);
      setTitle(survey.title);
      setDescription(survey.description ?? '');
      setQuestions([]); // TODO: Set questions from survey data
      setQuestions(survey.questions.map((q) => ({ id: q.id, text: q.text, type: q.questionType, options: [] })));
    },
  });

  const [createSurvey, { data: createSurveyData, loading: createSurveyLoading, error: createSurveyError }] =
    useMutation(CreateSurvey, {
      onCompleted: (data) => {
        console.log('Create survey data onComplete', data);
      },
    });

  console.log('Debug survey', survey);
  console.log('Debug create survey data', createSurveyData, createSurveyLoading, createSurveyError);

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
    type: QuestionType.MultiSelect,
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

  const deleteQuestion = (id: QuestionId) => {
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

  const selectQuestion = (id: QuestionId | null) => {
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
    console.log('Debug save survey');
    if (!survey) {
      console.log('Calling createSurvey');
      await createSurvey({
        variables: {
          title,
          description,
        },
      });
      return;
    }

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
