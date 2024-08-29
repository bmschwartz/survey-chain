import { Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import { Question } from '@/types';
import { questionTypeToDisplay } from '@/utils/question';

const SurveyPreview: React.FC = () => {
  const { title, description, questions } = useSurveyBuilder();
  return (
    <Card sx={{ marginTop: '2rem' }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1" sx={{ my: '0.5rem' }}>
          {description}
        </Typography>
        <Divider sx={{ mb: '0.5rem' }} />
        {questions.map((question: Question, index: number) => (
          <Typography key={index} variant="body1">
            {index + 1}. {question.text} {`[${questionTypeToDisplay(question.type)}]`}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default SurveyPreview;
