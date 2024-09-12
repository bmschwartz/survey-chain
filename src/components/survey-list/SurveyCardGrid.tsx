import { Grid2 } from '@mui/material';
import React from 'react';

import { Survey } from '@/types';
import SurveyCard from './SurveyCard';

interface SurveyCardGridProps {
  surveys: Survey[];
}

const SurveyCardGrid: React.FC<SurveyCardGridProps> = ({ surveys }) => {
  return (
    <Grid2 container spacing={4}>
      {surveys.map((survey) => (
        <Grid2 size={{ xs: 12, md: 6 }} key={survey.id}>
          <SurveyCard survey={survey} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default SurveyCardGrid;
