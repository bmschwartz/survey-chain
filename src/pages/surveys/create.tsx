import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { auth } from '@/auth';
import { SurveyBuilderProvider } from '@/contexts/SurveyBuilderContext';
import CreateSurveyView from '@/views/create-survey/CreateSurveyView';

const CreateSurveyPage: React.FC = () => {
  const router = useRouter();
  const { step: stepParam, surveyId: surveyIdParam } = router.query;
  const step = typeof stepParam === 'string' ? Number(stepParam) : undefined;
  const surveyId = typeof surveyIdParam === 'string' ? surveyIdParam : undefined;

  return (
    <SurveyBuilderProvider step={step} surveyId={surveyId}>
      <CreateSurveyView />
    </SurveyBuilderProvider>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth(ctx);
  const cookies = ctx.req.headers.cookie || '';

  return {
    props: {
      session,
      cookies,
    },
  };
}

export default CreateSurveyPage;
