import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';

interface SurveyCardProps {
  survey: {
    id: string;
    title: string;
    description: string;
    creator: string;
    questions: number;
  };
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey }) => {
  return (
    <Card
      sx={{
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {survey.title.length > 40 ? `${survey.title.slice(0, 40)}...` : survey.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1rem' }}>
          {survey.description.length > 40 ? `${survey.description.slice(0, 40)}...` : survey.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Creator: {survey.creator}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ marginLeft: '1rem' }}>
          Questions: {survey.questions}
        </Typography>
      </CardContent>

      <Divider sx={{ borderWidth: 1 }} />

      <CardActions sx={{ marginBottom: 1 }}>
        <Box sx={{ margin: 'auto' }}>
          <Button variant="outlined" color="primary">
            Take Survey
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default SurveyCard;
