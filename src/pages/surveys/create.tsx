import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { auth } from '@/auth';
import { SurveyBuilderProvider } from '@/contexts/SurveyBuilderContext';
import CreateSurveyView from '@/views/create-survey/CreateSurveyView';

const CreateSurveyPage: React.FC = () => {
  return (
    <SurveyBuilderProvider>
      <CreateSurveyView />
    </SurveyBuilderProvider>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth(ctx);

  console.log('create survey session', session);
  return {
    props: {
      session,
    },
  };
}

export default CreateSurveyPage;
