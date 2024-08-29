import { Box, Button, Divider, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import { Question, QuestionType } from '@/types';

const MAX_OPTIONS = 10;
const MAX_QUESTION_TEXT_LENGTH = 1000;
const MAX_OPTION_LENGTH = 300;

interface QuestionEditorDetailProps {
  question: Question | null;
  isNew: boolean;
  onAddNew: () => void;
}

const QuestionEditorDetail: React.FC<QuestionEditorDetailProps> = ({ question, isNew, onAddNew }) => {
  const { addQuestion, updateQuestion, deleteQuestion } = useSurveyBuilder();
  const [localQuestion, setLocalQuestion] = useState<Question>(
    question || {
      id: 0,
      text: '',
      type: QuestionType.MultipleChoice,
      options: [''], // Initialize with one empty option
    }
  );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    // Ensure there's at least one empty option for MultipleChoice or Dropdown
    if (
      (localQuestion.type === QuestionType.MultipleChoice || localQuestion.type === QuestionType.Dropdown) &&
      (!localQuestion.options || localQuestion.options.length === 0)
    ) {
      setLocalQuestion({ ...localQuestion, options: [''] });
    }

    setLocalQuestion(
      question || {
        id: 0,
        text: '',
        type: QuestionType.MultipleChoice,
        options: [''],
      }
    );
  }, [question]);

  const validateQuestion = () => {
    let valid = true;
    const newErrors: { [key: string]: string | null } = {};

    if (!localQuestion.text.trim()) {
      newErrors.text = 'Question text is required';
      valid = false;
    }

    if (
      (localQuestion.type === QuestionType.MultipleChoice || localQuestion.type === QuestionType.Dropdown) &&
      (!localQuestion.options || localQuestion.options.length === 0 || !localQuestion.options[0].trim())
    ) {
      newErrors.options = 'At least one option is required';
      valid = false;
    }

    if (localQuestion.type === QuestionType.RatingScale) {
      const [min, max] = localQuestion.options!;
      if (parseInt(min) >= parseInt(max)) {
        newErrors.rating = 'Minimum rating must be less than maximum rating';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSaveQuestion = () => {
    if (validateQuestion()) {
      if (isNew) {
        addQuestion(localQuestion);
      } else {
        updateQuestion(localQuestion);
      }
      onAddNew(); // Prepare for next question
    }
  };

  const handleTypeChange = (event: SelectChangeEvent<QuestionType>) => {
    const newType = event.target.value as QuestionType;
    let newOptions: string[] = [];

    if (newType === QuestionType.MultipleChoice || newType === QuestionType.Dropdown) {
      newOptions = ['']; // Default to one empty option
    } else if (newType === QuestionType.RatingScale) {
      newOptions = ['1', '5'];
    }

    setLocalQuestion({ ...localQuestion, type: newType, options: newOptions });
  };

  const handleQuestionTextChange = (value: string) => {
    setLocalQuestion({ ...localQuestion, text: value });
    setErrors((prev) => ({ ...prev, text: null }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = localQuestion.options ? [...localQuestion.options] : [];
    updatedOptions[index] = value;
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
    deleteQuestion(localQuestion.id);
    setShowDeleteConfirmation(false);
    onAddNew(); // Prepare for next question
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
      <Select value={localQuestion.type} onChange={handleTypeChange} fullWidth sx={{ marginBottom: '1rem' }}>
        <MenuItem value={QuestionType.MultipleChoice}>Multiple Choice</MenuItem>
        <MenuItem value={QuestionType.FillInTheBlank}>Fill in the Blank</MenuItem>
        <MenuItem value={QuestionType.RatingScale}>Rating Scale</MenuItem>
        <MenuItem value={QuestionType.Dropdown}>Dropdown</MenuItem>
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
      <Divider sx={{ marginY: '1rem' }} /> {/* Visual separator between sections */}
      {[QuestionType.MultipleChoice, QuestionType.Dropdown].includes(localQuestion.type) && (
        <Box>
          {localQuestion.options?.map((option, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <TextField
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                slotProps={{ htmlInput: { maxLength: MAX_OPTION_LENGTH } }}
                error={Boolean(errors.options)}
                helperText={index === 0 && errors.options ? errors.options : ''}
              />
              <Button
                onClick={() => handleDeleteOption(index)}
                color="secondary"
                disabled={localQuestion.options?.length === 1} // Disable if only one option left
              >
                Delete
              </Button>
            </Box>
          ))}
          {(localQuestion.options || []).length < MAX_OPTIONS && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
              <Button
                onClick={() => setLocalQuestion({ ...localQuestion, options: [...(localQuestion.options || []), ''] })}
                color="primary"
                sx={{ marginRight: '1rem' }}
              >
                Add Option
              </Button>
              <Typography variant="body2" color="textSecondary">
                {`${MAX_OPTIONS - (localQuestion.options || []).length} options remaining`}
              </Typography>
            </Box>
          )}
        </Box>
      )}
      {localQuestion.type === QuestionType.RatingScale && localQuestion.options?.length && (
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
        <Button variant="contained" color="primary" onClick={handleSaveQuestion} sx={{ marginRight: '1rem' }}>
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
          <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => setShowDeleteConfirmation(false)}>
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
