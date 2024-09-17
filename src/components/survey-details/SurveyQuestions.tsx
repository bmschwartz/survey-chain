import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

import { SurveyQuestion } from '@/types';

interface SurveyQuestionsProps {
  questions: SurveyQuestion[];
}

const SurveyQuestions: React.FC<SurveyQuestionsProps> = ({ questions }) => {
  return (
    <Box>
      <Typography variant="h5">Questions</Typography>
      <List>
        {questions.map((question) => (
          <ListItem key={question.id}>
            <ListItemText primary={question.text} secondary={question.questionType} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SurveyQuestions;
