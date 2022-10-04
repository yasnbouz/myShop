import Layout from '@/components/Layout';
import { QueryClientProvider, QueryClient, DehydratedState, Hydrate } from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import { SEO } from 'next-seo.config';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { CartProvider } from 'react-use-cart';

type Props = {
  children?: ReactNode;
  dehydratedState: DehydratedState;
};
export function Providers({ children, dehydratedState }: Props) {
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
      <CartProvider>
        <Hydrate state={dehydratedState}>
          <DefaultSeo {...SEO} />
          <Layout>{children}</Layout>
        </Hydrate>
      </CartProvider>
    </QueryClientProvider>
  );
}
