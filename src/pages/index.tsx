import { GetStaticProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { useGetProductsInCollectionQuery } from '@/services/shopify/generated/types';
import ProductList from '@/components/ProductList';
import { ReactElement } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { getProductsInCollection } from '@/services/shopify/api';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  const variables = { handle: `frontpage` };
  await queryClient.prefetchQuery(useGetProductsInCollectionQuery.getKey(variables), () => getProductsInCollection(variables));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
};

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductList />
    </div>
  );
}
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
