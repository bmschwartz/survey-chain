import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import MySurveysList from '@/components/my-surveys/MySurveysList';

const MySurveysView: React.FC = () => {
  const router = useRouter();

  const handleCreateSurvey = () => {
    router.push('/surveys/create');
    return;
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Typography variant="h4">My Surveys</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateSurvey}
          sx={{
            borderRadius: '8px',
            padding: '8px 16px',
            textTransform: 'none',
          }}
        >
          Create Survey
        </Button>
      </Box>
      <MySurveysList />
    </Container>
  );
};

export default MySurveysView;
