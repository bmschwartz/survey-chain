import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { auth } from '@/auth';
import SurveyListView from '@/views/survey-list/SurveyListView';

const SurveyListPage: React.FC = () => {
  return <SurveyListView />;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth(ctx);

  console.log('survey list session', session);
  return {
    props: {
      session,
    },
  };
}

export default SurveyListPage;
