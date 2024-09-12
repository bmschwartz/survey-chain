import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import ADD_SURVEY_QUESTION from '@/graphql/mutations/AddSurveyQuestion';
import CREATE_SURVEY from '@/graphql/mutations/CreateSurvey';
import GET_SURVEY from '@/graphql/queries/GetSurvey';
import { SurveyQuestion as GQLSurveyQuestion } from '@/graphql/types';
import { QuestionId, QuestionOption, QuestionType, SurveyQuestion } from '@/types';

type ValidationError = string;

interface SurveyBuilderContextType {
  activeStep: number;
  moveToStep: (step: number) => void;
  title: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  questions: SurveyQuestion[];
  selectedQuestion: SurveyQuestion | null;
  isAddingNewQuestion: boolean;
  validationErrors: ValidationError[];

  isLoading: boolean;
  addQuestion: (newQuestion: SurveyQuestion) => Promise<SurveyQuestion>;
  updateQuestion: (updatedQuestion: SurveyQuestion) => void;
  deleteQuestion: (id: QuestionId) => void;
  selectQuestion: (id: QuestionId | null) => void;
  resetNewQuestion: () => SurveyQuestion;
  createPlaceholderOption: () => QuestionOption;
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
  step?: number;
}

export const SurveyBuilderProvider: React.FC<SurveyBuilderProviderProps> = ({
  step,
  children,
  surveyId: initialSurveyId,
}) => {
  const router = useRouter();
  const [surveyId, setSurveyId] = useState<string | null>(initialSurveyId || null);
  const [activeStep, setActiveStep] = useState<number>(step || 0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState<boolean>(true);
  const [selectedQuestion, setSelectedQuestion] = useState<SurveyQuestion | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    router.push(
      {
        pathname: '/surveys/create',
        query: { ...router.query, surveyId, step: String(activeStep) },
      },
      undefined,
      { shallow: true }
    );
  }, [surveyId, activeStep]);

  const { loading: isGetSurveyLoading } = useQuery(GET_SURVEY, {
    fetchPolicy: 'network-only',
    variables: { id: surveyId ?? '' },
    onCompleted: ({ survey: surveyResult }) => {
      if (!surveyResult) {
        console.log('DEBUG no survey');
        return;
      }

      console.log('DEBUG received survey');
      const transformedQuestions = surveyResult.questions.map(transformSurveyQuestion);

      setSurveyId(surveyResult.id);
      setTitle(surveyResult.title);
      setDescription(surveyResult.description);
      setQuestions(transformedQuestions);

      console.log('DEBUG selected question', selectedQuestion);
      if (!selectedQuestion) {
        setSelectedQuestion(transformedQuestions.length > 0 ? transformedQuestions[0] : null);
      }
    },
  });

  const [createSurvey, { loading: createSurveyLoading, error: createSurveyError }] = useMutation(CREATE_SURVEY, {
    onCompleted: ({ createSurvey: data }) => {
      if (!data) {
        return;
      }
      setSurveyId(data.id);
      setTitle(data.title);
      setDescription(data.description);
      console.log('Create survey data onComplete', data);
    },
  });

  const [
    addSurveyQuestion,
    { data: addSurveyQuestionData, loading: addSurveyQuestionLoading, error: addSurveyQuestionError },
  ] = useMutation(ADD_SURVEY_QUESTION, {
    onCompleted: ({ addSurveyQuestion: result }) => {
      console.log(
        'Add survey question data onComplete',
        result,
        addSurveyQuestionData,
        addSurveyQuestionLoading,
        addSurveyQuestionError
      );
    },
  });

  const transformSurveyQuestion = (gqlQuestion: GQLSurveyQuestion): SurveyQuestion => {
    const { id, text, order, questionType, options } = gqlQuestion;
    return {
      id,
      text,
      order,
      questionType,
      options: options.map((o) => ({ id: o.id, text: o.text, order: o.order })),
    };
  };

  const resetSurvey = () => {
    setTitle('');
    setActiveStep(0);
    setQuestions([]);
    setDescription('');
    setSelectedQuestion(null);
  };

  const moveToStep = (step: number) => {
    setActiveStep(step);
  };

  const createPlaceholderOption = (): QuestionOption => ({
    id: Date.now().toString(),
    text: '',
    order: 0,
  });

  const resetNewQuestion = (): SurveyQuestion => {
    console.log('DEBUG reset new question with questions length', questions.length);
    return {
      id: Date.now().toString(),
      text: '',
      order: questions.length,
      questionType: QuestionType.MultiSelect,
      options: [createPlaceholderOption()],
    };
  };

  const addQuestion = async (newQuestion: SurveyQuestion): Promise<SurveyQuestion> => {
    console.log('Debug question data to add', surveyId, newQuestion.text, newQuestion.questionType, newQuestion.order);
    if (!surveyId || !newQuestion.text || !newQuestion.questionType || newQuestion.order === undefined) {
      throw new Error('Invalid question data');
    }

    for (const option of newQuestion.options || []) {
      if (!option.text || option.order === undefined) {
        throw new Error('Invalid option data');
      }
    }

    console.log('Debug add question', {
      surveyId,
      text: newQuestion.text,
      order: newQuestion.order,
      questionType: newQuestion.questionType,
      options: newQuestion.options?.map((o) => ({ text: o.text!, order: o.order! })) || [],
    });

    const result = await addSurveyQuestion({
      variables: {
        surveyId,
        text: newQuestion.text,
        order: newQuestion.order,
        questionType: newQuestion.questionType,
        options: newQuestion.options?.map((o) => ({ text: o.text!, order: o.order! })) || [],
      },
    });

    const createdQuestion = result.data?.addSurveyQuestion;
    if (!createdQuestion) {
      throw new Error('Failed to add question');
    }

    console.log('Debug created question', createdQuestion);
    const { id, options, order, questionType, text } = createdQuestion;
    const transformedQuestion: SurveyQuestion = {
      id,
      text,
      order,
      questionType,
      options: options.map((o) => ({ id: o.id, text: o.text, order: o.order })),
    };

    console.log('Debug transformed question', transformedQuestion);
    setQuestions([...questions, transformedQuestion]);
    setSelectedQuestion(transformedQuestion);

    console.log('Debug questions and selected', questions, selectedQuestion);

    return transformedQuestion;
  };

  const updateQuestion = (updatedQuestion: SurveyQuestion) => {
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
    console.log('selectQuestion', id);
    if (id === null) {
      setIsAddingNewQuestion(true);
      setSelectedQuestion(null);
      return;
    }

    console.log(
      'setting question',
      questions.find((q) => q.id === id)
    );
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
    if (questions.some((q) => (q.text || '').trim() === '')) {
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

  const createNewSurvey = async () => {
    if (!title) {
      throw new Error('Title is required');
    }
    console.log('Calling createSurvey');
    await createSurvey({
      variables: {
        title,
        description,
      },
    });
  };

  const saveSurvey = async () => {
    console.log('Debug save survey');
    if (!surveyId) {
      await createNewSurvey();
      return;
    }

    // TODO: update survey
    // await updateSurvey()
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
        isLoading: isGetSurveyLoading || createSurveyLoading || addSurveyQuestionLoading,
        setIsAddingNewQuestion,
        moveToStep,
        setTitle,
        setDescription,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        selectQuestion,
        resetSurvey,
        saveSurvey,
        validateStep,
        createPlaceholderOption,
        resetNewQuestion,
      }}
    >
      {children}
    </SurveyBuilderContext.Provider>
  );
};
