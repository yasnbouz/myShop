import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { CartProvider } from 'react-use-cart';
import { useRouter } from 'next/router';

import 'the-new-css-reset/css/reset.css';
// eslint-disable-next-line import/no-unresolved
import 'windi.css';
import '../styles/global.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
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
        <CartProvider>{getLayout(<Component {...pageProps} key={router.asPath} />)}</CartProvider>,
      </Hydrate>
    </QueryClientProvider>
  );
}
