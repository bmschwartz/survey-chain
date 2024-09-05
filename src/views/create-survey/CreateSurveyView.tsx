import { Card, CardContent, Container, Typography } from '@mui/material';
import React from 'react';

import SurveyWizard from '@/components/survey-wizard/SurveyWizard';

const CreateSurveyView: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        Create a New Survey
      </Typography>
      <Card
        sx={{
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          transition: 'none', // Disable transition effect on hover
          '&:hover': {
            transform: 'none', // Remove hover scaling effect
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Keep original shadow on hover
          },
        }}
      >
        <CardContent>
          <SurveyWizard />
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateSurveyView;
