import { GetServerSidePropsContext } from 'next';
import React from 'react';

import { auth } from '@/auth';
import HomeView from '@/views/home/HomeView';

const HomePage = () => {
  return <HomeView />;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log('getting session');
  const session = await auth(ctx);
  console.log('got session', session);
  return {
    props: {
      session,
    },
  };
}

export default HomePage;
