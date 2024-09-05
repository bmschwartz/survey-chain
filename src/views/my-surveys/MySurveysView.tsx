import { Container, Typography } from '@mui/material';
import React from 'react';

import SurveyGrid from '@/components/survey-list/SurveyGrid';

const MySurveysView: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        My Surveys
      </Typography>
      <SurveyGrid />
    </Container>
  );
};

export default MySurveysView;
