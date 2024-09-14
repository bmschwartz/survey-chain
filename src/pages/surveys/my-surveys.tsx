import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { auth } from '@/auth';
import MySurveysView from '@/views/my-surveys/MySurveysView';

const MySurveysPage: React.FC = () => {
  return <MySurveysView />;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default MySurveysPage;
