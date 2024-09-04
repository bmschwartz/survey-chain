import { Card, CardContent, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import SurveyListTabs, { SurveyListTab } from '@/components/survey-list/SurveyListTabs';

const SurveyListView: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        Explore Surveys
      </Typography>
      <Card sx={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
        <CardContent>
          {activeTab !== undefined && <SurveyListTabs activeTab={activeTab} onChangeTab={handleTabChange} />}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SurveyListView;
