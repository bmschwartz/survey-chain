import React from 'react';

import SurveyAnalytics from '@/components/survey-details/SurveyAnalytics';
import SurveyResponses from '@/components/survey-details/SurveyResponse';
import SurveyStats from '@/components/survey-details/SurveyStats';
import { useMySurveyDetails } from '@/contexts/MySurveyDetailsContext';
import { Visibility } from '@/types';

const MySurveyDetailsView: React.FC = () => {
  const { survey } = useMySurveyDetails();

  return (
    <>
      <SurveyStats
        title={survey.title || ''}
        visibility={survey.visibility || Visibility.Public}
        responseCount={survey.responses.length || 0}
        isPublished={survey.isPublished || false}
      />
      <SurveyAnalytics />
      <SurveyResponses />
    </>
  );
};

export default MySurveyDetailsView;
