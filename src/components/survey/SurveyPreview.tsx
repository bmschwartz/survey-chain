import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';

const SurveyPreview: React.FC = () => {
  const { title, description, questions } = useSurveyBuilder();
  return (
    <Card sx={{ marginTop: '2rem' }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
          {description}
        </Typography>
        {questions.map((question: any, index: number) => (
          <Typography key={index} variant="h6">
            {index + 1}. {question.text}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default SurveyPreview;
