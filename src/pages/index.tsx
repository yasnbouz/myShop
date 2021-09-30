import { GetStaticProps } from 'next';
import { shopifyClient } from '@/services/shopify/lib/shopifyClient';
import { QueryClient, dehydrate } from 'react-query';
import { getSdk, useGetProductsInCollectionQuery } from '@/services/shopify/generated/types';
import ProductList from '@/components/ProductList';
import { ReactElement } from 'react';
import Layout from '@/components/Layout';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const sdk = getSdk(shopifyClient);
  const variables = { handle: `frontpage` };
  await queryClient.prefetchQuery(useGetProductsInCollectionQuery.getKey(variables), () => sdk.getProductsInCollection(variables));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  return (
    <div>
      <ProductList />
    </div>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
