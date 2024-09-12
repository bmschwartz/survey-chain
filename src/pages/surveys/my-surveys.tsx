import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import React from 'react';

import { auth, signIn } from '@/auth';
import MySurveysView from '@/views/my-surveys/MySurveysView';

interface MySurveysPageProps {
  session: Session;
}

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
