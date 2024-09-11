import React from 'react';

import SurveyAnalytics from '@/components/survey-details/SurveyAnalytics';
import SurveyResponses from '@/components/survey-details/SurveyResponse';
import SurveyStats from '@/components/survey-details/SurveyStats';
import { useMySurveyDetails } from '@/contexts/MySurveyDetailsContext';

const MySurveyDetailsView: React.FC = () => {
  const { survey } = useMySurveyDetails();

  return (
    <>
      <SurveyStats
        title={survey.title}
        visibility={survey.visibility}
        responseCount={survey.responses.length}
        isPublished={survey.isPublished}
      />
      <SurveyAnalytics />
      <SurveyResponses />
    </>
  );
};

export default MySurveyDetailsView;
