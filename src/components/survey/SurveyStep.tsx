import { Box, TextField, Typography } from '@mui/material';
import React, { useCallback } from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import QuestionEditor from './question/QuestionEditor';

const SurveyStep: React.FC = () => {
  const { activeStep, title, description, setTitle, setDescription } = useSurveyBuilder();

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

  switch (activeStep) {
    case 0:
      return (
        <Box>
          <TextField label="Survey Title" fullWidth value={title} onChange={handleTitleChange} />
          <TextField
            label="Survey Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            sx={{ marginTop: '1rem' }}
          />
        </Box>
      );
    case 1:
      return <QuestionEditor />;
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
