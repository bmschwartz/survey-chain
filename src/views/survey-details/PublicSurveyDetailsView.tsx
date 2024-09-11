// views/survey-details/PublicSurveyDetailsView.tsx
import React from 'react';

import SurveyQuestions from '@/components/survey-details/SurveyQuestions';
import SurveyStats from '@/components/survey-details/SurveyStats';
import { usePublicSurveyDetails } from '@/contexts/PublicSurveyDetailsContext';

const PublicSurveyDetailsView: React.FC = () => {
  const { survey } = usePublicSurveyDetails();

  return (
    <>
      <SurveyStats
        title={survey.title}
        visibility={survey.visibility}
        responseCount={survey.responses.length}
        isPublished={survey.isPublished}
      />
      <SurveyQuestions questions={survey.questions} />
    </>
  );
};

export default PublicSurveyDetailsView;
