import { Box, TextField } from '@mui/material';
import React, { useCallback } from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';

const BasicInformation: React.FC = () => {
  const { title, description, setTitle, setDescription } = useSurveyBuilder();

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <Box sx={{ width: '100%', maxWidth: '900px' }}>
        <TextField
          label="Survey Title"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          sx={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Survey Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
        />
      </Box>
    </Box>
  );
};

export default BasicInformation;
