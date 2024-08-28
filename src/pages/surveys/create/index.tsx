import React from 'react';

import { SurveyBuilderProvider } from '@/contexts/SurveyBuilderContext';
import CreateSurveyView from '@/views/surveys/CreateSurveyView';

const CreateSurveyPage: React.FC = () => {
  return (
    <SurveyBuilderProvider>
      <CreateSurveyView />
    </SurveyBuilderProvider>
  );
};

export default CreateSurveyPage;
