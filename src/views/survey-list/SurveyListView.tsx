import { Container, Typography } from '@mui/material';
import React from 'react';

import SurveyCardGrid from '@/components/survey-list/SurveyCardGrid';

const surveys = [
  {
    id: '1',
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our service by filling out this short survey.',
    creator: 'John Doe',
    questions: 10,
  },
  {
    id: '2',
    title: 'Workplace Wellness Survey',
    description: 'Share your feedback about your workplace environment.',
    creator: 'Jane Smith',
    questions: 20,
  },
  // More surveys...
];

const SurveyListView: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        Explore Surveys
      </Typography>
      <SurveyCardGrid surveys={surveys} />
    </Container>
  );
};

export default SurveyListView;
