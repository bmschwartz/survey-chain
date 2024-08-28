import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface SurveyPreviewProps {
  surveyData: any;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ surveyData }) => {
  return (
    <Card sx={{ marginTop: '2rem' }}>
      <CardContent>
        <Typography variant="h5">{surveyData.title}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
          {surveyData.description}
        </Typography>
        {surveyData.questions.map((question: any, index: number) => (
          <Typography key={index} variant="h6">
            {index + 1}. {question.text}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default SurveyPreview;
