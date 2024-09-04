import { CssBaseline, ThemeProvider } from '@mui/material';
import Head from 'next/head';

import { MainLayout } from '@/layouts';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import Header from '@/components/common/Header';
import theme from '@/theme';

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <main>{getLayout(<Component {...pageProps} />)}</main>
      </ThemeProvider>
    </SessionProvider>
  );
}
