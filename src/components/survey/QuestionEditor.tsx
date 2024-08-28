import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid2, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { Question } from '@/types';

interface QuestionEditorProps {
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ questions, onQuestionsChange }) => {
  const [newQuestionText, setNewQuestionText] = useState('');

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: newQuestionText,
      type: 'multiple-choice', // Default question type
      options: [],
    };
    onQuestionsChange([...questions, newQuestion]);
    setNewQuestionText('');
  };

  const handleDeleteQuestion = (id: number) => {
    onQuestionsChange(questions.filter((question) => question.id !== id));
  };

  return (
    <Box>
      {questions.map((question, index) => (
        <Box
          key={index}
          sx={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fafafa', borderRadius: '8px' }}
        >
          <Grid2 container alignItems="center" spacing={2}>
            <Grid2 size={8}>
              <Typography variant="h6">{question.text}</Typography>
            </Grid2>
            <Grid2 size={4} textAlign="right">
              <IconButton onClick={() => handleDeleteQuestion(question.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Grid2>
          </Grid2>
        </Box>
      ))}

      <TextField
        label="New Question"
        fullWidth
        value={newQuestionText}
        onChange={(e) => setNewQuestionText(e.target.value)}
        sx={{ marginBottom: '1rem' }}
      />
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddQuestion}>
        Add Question
      </Button>
    </Box>
  );
};

export default QuestionEditor;
