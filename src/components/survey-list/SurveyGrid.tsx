import { Grid } from '@mui/material';
import React from 'react';

import SurveyCard from './SurveyCard';

// Dummy survey data for now
const surveyData = [
  {
    id: '1',
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our service by filling out this short survey.',
    creator: 'John Doe',
    responses: 100,
  },
  {
    id: '2',
    title: 'Workplace Wellness Survey',
    description: 'Share your feedback about your workplace environment.',
    creator: 'Jane Smith',
    responses: 80,
  },
  // Add more survey data here
];

const SurveyGrid: React.FC = () => {
  return (
    <Grid container spacing={4} sx={{ marginTop: '2rem' }}>
      {surveyData.map((survey) => (
        <Grid item xs={12} sm={6} md={4} key={survey.id}>
          <SurveyCard survey={survey} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SurveyGrid;
