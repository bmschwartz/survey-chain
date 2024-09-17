import React from 'react';

import SurveyQuestions from '@/components/survey-details/SurveyQuestions';
import SurveyStats from '@/components/survey-details/SurveyStats';
import { usePublicSurveyDetails } from '@/contexts/PublicSurveyDetailsContext';
import { Visibility } from '@/types';

const PublicSurveyDetailsView: React.FC = () => {
  const { survey } = usePublicSurveyDetails();

  return (
    <>
      <SurveyStats
        title={survey.title || ''}
        visibility={survey.visibility || Visibility.Public}
        responseCount={survey.responses.length}
        isPublished={survey.isPublished || false}
      />
      <SurveyQuestions questions={survey.questions} />
    </>
  );
};

export default PublicSurveyDetailsView;
