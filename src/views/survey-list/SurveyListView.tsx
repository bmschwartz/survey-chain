import { useQuery } from '@apollo/client';
import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';

import SurveyCardGrid from '@/components/survey-list/SurveyCardGrid';
import GET_ALL_SURVEYS from '@/graphql/queries/GetAllSurveys';
import { GetAllSurveysQuery, Survey as GQLSurvey } from '@/graphql/types';
import { Survey, transformSurvey } from '@/types';

const SurveyListView: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useQuery(GET_ALL_SURVEYS, {
    onCompleted: (data: GetAllSurveysQuery) => {
      setSurveys(data.surveys.map((survey) => transformSurvey(survey as GQLSurvey)));
    },
  });

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        Explore Surveys
      </Typography>
      <SurveyCardGrid surveys={surveys} />
    </Container>
  );
};

export default SurveyListView;
