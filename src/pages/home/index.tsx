import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { auth } from '@/auth';
import HomeView from '@/views/home/HomeView';

const HomePage = () => {
  return <HomeView />;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await auth(ctx);

  return {
    props: {
      session,
    },
  };
}

export default HomePage;
