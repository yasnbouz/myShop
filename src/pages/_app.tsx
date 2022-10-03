import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { DehydratedState } from '@tanstack/react-query';

import { useRouter } from 'next/router';
import { Providers } from '@/providers/default';

import 'the-new-css-reset/css/reset.css';
// eslint-disable-next-line import/no-unresolved
import 'windi.css';
import '../styles/global.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: { dehydratedState: DehydratedState };
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  return (
    <Providers dehydratedState={pageProps.dehydratedState}>
      <Component {...pageProps} key={router.asPath} />
    </Providers>
  );
}
