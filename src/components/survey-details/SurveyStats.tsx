import { Box, Chip, Typography } from '@mui/material';
import React from 'react';

interface SurveyStatsProps {
  title: string;
  visibility: string;
  responseCount: number;
  isPublished: boolean;
}

const SurveyStats: React.FC<SurveyStatsProps> = ({ title, visibility, responseCount, isPublished }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4">{title}</Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Chip label={isPublished ? 'Published' : 'Draft'} color={isPublished ? 'success' : 'warning'} />
        <Chip label={visibility} />
        <Chip label={`Responses: ${responseCount}`} />
      </Box>
    </Box>
  );
};

export default SurveyStats;
