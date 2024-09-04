import React from 'react';

import { useSurveyBuilder } from '@/contexts/SurveyBuilderContext';
import BasicInformation from './BasicInformation';
import QuestionEditor from './question/QuestionEditor';
import SurveyPreview from './SurveyPreview';

const SurveyStep: React.FC = () => {
  const { activeStep } = useSurveyBuilder();

  switch (activeStep) {
    case 0:
      return <BasicInformation />;
    case 1:
      return <QuestionEditor />;
    case 2:
      return <SurveyPreview />;
    default:
      return null;
  }
};

export default SurveyStep;
