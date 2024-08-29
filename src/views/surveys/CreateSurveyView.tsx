import { Card, CardContent } from '@mui/material';
import React from 'react';

import SurveyWizard from '@/components/survey/SurveyWizard';

const CreateSurveyView = () => {
  return (
    <Card sx={{ margin: '2rem', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <CardContent>
        <SurveyWizard />
      </CardContent>
    </Card>
  );
};

export default CreateSurveyView;
