import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import { QuestionType } from '@/types';

const QuestionEditorDetail: React.FC = () => {
  const { questions, selectedQuestionId, updateQuestion, deleteQuestion } = useSurveyBuilder();

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  if (!selectedQuestion) {
    return (
      <Box sx={{ padding: '2rem', textAlign: 'center' }}>
        <Typography variant="h6">
          {questions.length === 0 ? 'Add a question to get started' : 'Select a question to edit'}
        </Typography>
      </Box>
    );
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion({ ...selectedQuestion, text: e.target.value });
  };

  const handleTypeChange = (event: SelectChangeEvent<QuestionType>) => {
    updateQuestion({ ...selectedQuestion, type: event.target.value as QuestionType });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = selectedQuestion.options ? [...selectedQuestion.options] : [];
    updatedOptions[index] = value;
    updateQuestion({ ...selectedQuestion, options: updatedOptions });
  };

  const handleAddOption = () => {
    const updatedOptions = selectedQuestion.options ? [...selectedQuestion.options, ''] : [''];
    updateQuestion({ ...selectedQuestion, options: updatedOptions });
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = selectedQuestion.options ? selectedQuestion.options.filter((_, i) => i !== index) : [];
    updateQuestion({ ...selectedQuestion, options: updatedOptions });
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
      <Select value={selectedQuestion.type} onChange={handleTypeChange} fullWidth sx={{ marginBottom: '1rem' }}>
        <MenuItem value={QuestionType.MultipleChoice}>Multiple Choice</MenuItem>
        <MenuItem value={QuestionType.FillInTheBlank}>Fill in the Blank</MenuItem>
        <MenuItem value={QuestionType.RatingScale}>Rating Scale</MenuItem>
        <MenuItem value={QuestionType.Dropdown}>Dropdown</MenuItem>
      </Select>
      <TextField
        label="Question Text"
        fullWidth
        value={selectedQuestion.text}
        onChange={handleTextChange}
        sx={{ marginBottom: '1rem' }}
        multiline
        rows={4} // Make it a textarea
      />
      {selectedQuestion.type === QuestionType.MultipleChoice && (
        <Box>
          {selectedQuestion.options?.map((option, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <TextField
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
              />
              <Button onClick={() => handleDeleteOption(index)} color="secondary">
                Delete
              </Button>
            </Box>
          ))}
          <Button onClick={handleAddOption} color="primary" sx={{ marginTop: '1rem' }}>
            Add Option
          </Button>
        </Box>
      )}
      <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: '1rem' }}
          onClick={() => updateQuestion(selectedQuestion)}
        >
          Save Changes
        </Button>
        <Button variant="outlined" color="error" onClick={() => deleteQuestion(selectedQuestion.id)}>
          Delete Question
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionEditorDetail;
