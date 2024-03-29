import { GetStaticProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useGetProductsInCollectionQuery } from '@/services/shopify/generated/types';
import ProductList from '@/components/ProductList';
import Hero from '@/components/Hero';

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const variables = { handle: `frontpage` };
  await queryClient.prefetchQuery(useGetProductsInCollectionQuery.getKey(variables), useGetProductsInCollectionQuery.fetcher(variables));
  const dehydratedState = await dehydrate(queryClient);
  return {
    props: {
      dehydratedState,
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
