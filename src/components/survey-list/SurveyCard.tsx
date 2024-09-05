import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';

interface SurveyCardProps {
  survey: {
    id: string;
    title: string;
    description: string;
    creator: string;
    responses: number;
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
        <Typography variant="h6" component="div" gutterBottom>
          {survey.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1rem' }}>
          {survey.description}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Created by: {survey.creator}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Responses: {survey.responses}
        </Typography>
      </CardContent>

      <Divider sx={{ borderWidth: 1, marginY: 1 }} />

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
