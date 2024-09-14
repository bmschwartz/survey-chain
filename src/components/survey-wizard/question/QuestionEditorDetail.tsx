import { Box, Button, Divider, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import { QuestionOption, QuestionType, SurveyQuestion } from '@/types';

const MAX_OPTIONS = 10;
const MAX_QUESTION_TEXT_LENGTH = 1000;
const MAX_OPTION_LENGTH = 300;

interface QuestionEditorDetailProps {
  question: SurveyQuestion;
  isNew: boolean;
  onAddNew: () => void;
}

const QuestionEditorDetail: React.FC<QuestionEditorDetailProps> = ({ question, isNew, onAddNew }) => {
  const { addQuestion, updateQuestion, deleteQuestion, validateStep, createPlaceholderOption } = useSurveyBuilder();

  // Initialize the local state with the incoming question prop
  const [localQuestion, setLocalQuestion] = useState<SurveyQuestion>(question);
  const [initialQuestion, setInitialQuestion] = useState<SurveyQuestion>(question); // Save initial state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const hasLocalChanges = !isEqual(localQuestion, initialQuestion); // Compare local state with initial state

  // Update the local state when the selected question changes
  useEffect(() => {
    if (question.id !== initialQuestion.id) {
      setInitialQuestion(question);
      setLocalQuestion(question);
    }
  }, [question, initialQuestion]);

  const validateQuestion = () => {
    let valid = true;
    const newErrors: { [key: string]: string | null } = {};

    if (!localQuestion.text?.trim()) {
      newErrors.text = 'Question text is required';
      valid = false;
    }

    if (
      (localQuestion.questionType === QuestionType.MultiSelect ||
        localQuestion.questionType === QuestionType.SingleSelect) &&
      (!localQuestion.options || localQuestion.options.length === 0 || !localQuestion.options[0].text?.trim())
    ) {
      newErrors.options = 'At least one option is required';
      valid = false;
    }

    if (localQuestion.questionType === QuestionType.RatingScale) {
      const [min, max] = localQuestion.options!;
      if (parseInt(min.text || 'Inf') >= parseInt(max.text || '-Inf')) {
        newErrors.rating = 'Minimum rating must be less than maximum rating';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSaveQuestion = async () => {
    if (validateQuestion()) {
      if (isNew) {
        await addQuestion(localQuestion);
        onAddNew();
      } else {
        await updateQuestion(localQuestion);
        setInitialQuestion(localQuestion);
      }
    }
    await validateStep();
  };

  const handleTypeChange = (event: SelectChangeEvent<QuestionType>) => {
    const newType = event.target.value as QuestionType;
    let newOptions: QuestionOption[] = [];

    if (newType === QuestionType.MultiSelect || newType === QuestionType.SingleSelect) {
      newOptions = [createPlaceholderOption()]; // Default to one empty option
    } else if (newType === QuestionType.RatingScale) {
      newOptions = [
        { ...createPlaceholderOption(), text: '1' },
        { ...createPlaceholderOption(), order: 1, text: '5' },
      ];
    }

    setLocalQuestion({ ...localQuestion, questionType: newType, options: newOptions });
  };

  const handleQuestionTextChange = (value: string) => {
    setLocalQuestion({ ...localQuestion, text: value });
    setErrors((prev) => ({ ...prev, text: null }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = localQuestion.options ? [...localQuestion.options] : [];
    updatedOptions[index].text = value;
    setLocalQuestion({ ...localQuestion, options: updatedOptions });
    setErrors((prev) => ({ ...prev, options: null }));
  };

  const handleDeleteOption = (index: number) => {
    if (localQuestion.options && localQuestion.options.length > 1) {
      const updatedOptions = localQuestion.options.filter((_, i) => i !== index);
      setLocalQuestion({ ...localQuestion, options: updatedOptions });
    }
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteQuestion = () => {
    if (localQuestion.id) {
      deleteQuestion(localQuestion.id);
      setShowDeleteConfirmation(false);
      onAddNew(); // Prepare for next question
    }
  };

  const addOption = () => {
    const options: QuestionOption[] = localQuestion.options || [];
    const newOption: QuestionOption = { ...createPlaceholderOption(), order: options.length };
    setLocalQuestion({ ...localQuestion, options: [...options, newOption] });
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Select value={localQuestion.questionType} onChange={handleTypeChange} fullWidth sx={{ marginBottom: '1rem' }}>
        <MenuItem value={QuestionType.MultiSelect}>Multiple Selection</MenuItem>
        <MenuItem value={QuestionType.FillInTheBlank}>Fill in the Blank</MenuItem>
        <MenuItem value={QuestionType.RatingScale}>Rating Scale</MenuItem>
        <MenuItem value={QuestionType.SingleSelect}>Single Select</MenuItem>
      </Select>
      <TextField
        label="Question Text"
        fullWidth
        value={localQuestion.text}
        onChange={(e) => handleQuestionTextChange(e.target.value)}
        sx={{ marginBottom: '1rem' }}
        multiline
        rows={4}
        slotProps={{ htmlInput: { maxLength: MAX_QUESTION_TEXT_LENGTH } }}
        error={Boolean(errors.text)}
        helperText={errors.text}
      />
      <Divider sx={{ marginY: '1rem' }} />
      {localQuestion.questionType &&
        [QuestionType.MultiSelect, QuestionType.SingleSelect].includes(localQuestion.questionType) && (
          <Box>
            {localQuestion.options?.map((option, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <TextField
                  label={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  fullWidth
                  slotProps={{ htmlInput: { maxLength: MAX_OPTION_LENGTH } }}
                  error={Boolean(errors.options)}
                  helperText={index === 0 && errors.options ? errors.options : ''}
                />
                <Button
                  onClick={() => handleDeleteOption(index)}
                  color="secondary"
                  disabled={localQuestion.options?.length === 1}
                >
                  Delete
                </Button>
              </Box>
            ))}
            {(localQuestion.options || []).length < MAX_OPTIONS && (
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                <Button onClick={addOption} color="primary" sx={{ marginRight: '1rem' }}>
                  Add Option
                </Button>
                <Typography variant="body2" color="textSecondary">
                  {`${MAX_OPTIONS - (localQuestion.options || []).length} options remaining`}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      {localQuestion.questionType === QuestionType.RatingScale && localQuestion.options?.length && (
        <Box sx={{ marginTop: '1rem' }}>
          <TextField
            label="Minimum Rating"
            type="number"
            fullWidth
            value={localQuestion.options[0] || '1'}
            onChange={(e) => handleOptionChange(0, e.target.value)}
            sx={{ marginBottom: '1rem' }}
            error={Boolean(errors.rating)}
          />
          <TextField
            label="Maximum Rating"
            type="number"
            fullWidth
            value={localQuestion.options[1] || '5'}
            onChange={(e) => handleOptionChange(1, e.target.value)}
            error={Boolean(errors.rating)}
            helperText={errors.rating}
          />
        </Box>
      )}
      <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant={hasLocalChanges ? 'contained' : 'outlined'}
          color={hasLocalChanges ? 'primary' : 'success'}
          disabled={!hasLocalChanges}
          onClick={handleSaveQuestion}
          sx={{ marginRight: '1rem' }}
        >
          {isNew ? 'Save' : 'Update'}
        </Button>
        {!isNew && (
          <Button variant="outlined" color="error" onClick={handleDeleteConfirmation} sx={{ marginRight: '1rem' }}>
            Delete Question
          </Button>
        )}
      </Box>
      <Modal open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">Are you sure you want to delete this question?</Typography>
          <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: '1rem' }}
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={confirmDeleteQuestion}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default QuestionEditorDetail;
