import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import MySurveysList from '@/components/my-surveys/MySurveysList';

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
];

const MySurveysView: React.FC = () => {
  const router = useRouter();

  const handleCreateSurvey = () => {
    // Navigate to the survey creation page
    router.push('/surveys/create');
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
            textTransform: 'none', // Avoid all caps for a modern look
          }}
        >
          Create Survey
        </Button>
      </Box>
      <MySurveysList surveys={surveys} />
    </Container>
  );
};

export default MySurveysView;
