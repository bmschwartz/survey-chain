import { CssBaseline, ThemeProvider } from '@mui/material';
import Head from 'next/head';

import { MainLayout } from '@/layouts';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import '@/styles/globals.css';

// import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs';
import { SessionProvider } from 'next-auth/react';

// import FullScreenLoader from '@/components/common/FullScreenLoader';
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
    // <ClerkProvider>
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <ClerkLoading>
          <FullScreenLoader />
        </ClerkLoading> */}
        {/* <ClerkLoaded> */}
        <Header />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <main>{getLayout(<Component {...pageProps} />)}</main>
        {/* </ClerkLoaded> */}
      </ThemeProvider>
    </SessionProvider>
    // </ClerkProvider>
  );
}
