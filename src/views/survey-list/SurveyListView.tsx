import { Container } from '@mui/material';
import React from 'react';

import FilterBar from '@/components/survey-list/FilterBar';
import SurveyGrid from '@/components/survey-list/SurveyGrid';

const SurveyListView: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <FilterBar />
      <SurveyGrid />
    </Container>
  );
};

export default SurveyListView;
