import { Button, Card, CardContent, List, ListItemButton, Typography } from '@mui/material';
import React from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';

const QuestionEditorSidebar: React.FC = () => {
  const { questions, selectedQuestionId, addQuestion, selectQuestion } = useSurveyBuilder();

  return (
    <div>
      <Button variant="contained" color="primary" onClick={addQuestion} sx={{ marginBottom: '1rem', width: '100%' }}>
        Add New Question
      </Button>
      <List>
        {questions.map((question, index) => (
          <ListItemButton
            key={question.id}
            selected={question.id === selectedQuestionId}
            onClick={() => selectQuestion(question.id)}
            sx={{ marginBottom: '0.5rem' }}
          >
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {index + 1}. {question.text.length > 30 ? `${question.text.substring(0, 30)}...` : question.text}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {question.type}
                </Typography>
              </CardContent>
            </Card>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default QuestionEditorSidebar;
