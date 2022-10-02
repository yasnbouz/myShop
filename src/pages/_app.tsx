import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { DehydratedState } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query';

import { CartProvider } from 'react-use-cart';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { SEO } from 'next-seo.config';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
  const getLayout = Component.getLayout ?? ((page) => page);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { cacheTime: Infinity, refetchOnWindowFocus: false, refetchOnMount: false },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CartProvider>
          <DefaultSeo {...SEO} />
          {getLayout(<Component {...pageProps} key={router.asPath} />)}
        </CartProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
