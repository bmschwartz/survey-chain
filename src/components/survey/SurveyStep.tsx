import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

import { Question } from '@/types';
import QuestionEditor from './QuestionEditor';

interface SurveyStepProps {
  step: number;
  surveyData: any;
  onSurveyDataChange: (newData: any) => void;
}

const SurveyStep: React.FC<SurveyStepProps> = ({ step, surveyData, onSurveyDataChange }) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSurveyDataChange({ title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSurveyDataChange({ description: e.target.value });
  };

  const handleQuestionChange = (questions: Question[]) => {
    onSurveyDataChange({ questions });
  };

  switch (step) {
    case 0:
      return (
        <Box>
          <TextField label="Survey Title" fullWidth value={surveyData.title} onChange={handleTitleChange} />
          <TextField
            label="Survey Description"
            fullWidth
            multiline
            rows={4}
            value={surveyData.description}
            onChange={handleDescriptionChange}
            sx={{ marginTop: '1rem' }}
          />
        </Box>
      );
    case 1:
      return <QuestionEditor questions={surveyData.questions} onQuestionsChange={handleQuestionChange} />;
    case 2:
      return (
        <Box>
          <Typography variant="h6">Review Your Survey:</Typography>
          {/* Detailed preview or summary of the survey */}
        </Box>
      );
    default:
      return null;
  }
};

export default SurveyStep;
