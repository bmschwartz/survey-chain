import { CssBaseline, ThemeProvider } from '@mui/material';
import Head from 'next/head';

import { MainLayout } from '@/layouts';

import '@/styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

import Header from '@/components/common/Header';
import AuthProvider from '@/contexts/AuthContext';
import apolloClient from '@/lib/apolloClient';
import theme from '@/theme';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <AuthProvider>
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <main>{getLayout(<Component {...pageProps} />)}</main>
          </ThemeProvider>
        </ApolloProvider>
      </SessionProvider>
    </AuthProvider>
  );
}
