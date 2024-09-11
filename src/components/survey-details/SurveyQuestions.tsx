// components/survey-details/SurveyQuestions.tsx
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface Question {
  id: string;
  questionText: string;
  questionType: string;
  options: string[];
}

interface SurveyQuestionsProps {
  questions: Question[];
}

const SurveyQuestions: React.FC<SurveyQuestionsProps> = ({ questions }) => {
  return (
    <Box>
      <Typography variant="h5">Questions</Typography>
      <List>
        {questions.map((question) => (
          <ListItem key={question.id}>
            <ListItemText primary={question.questionText} secondary={question.questionType} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SurveyQuestions;
