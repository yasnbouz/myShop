import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import ProductDetail from '@/components/ProductDetail';
import { useGetProductQuery, useGetProductsSlugsQuery } from '@/services/shopify/generated/types';

export default function ProductPage() {
  return (
    <div>
      <ProductDetail />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await useGetProductsSlugsQuery.fetcher()();
  const slugs = data.products?.edges.slice(0, 2) ?? [];
  const paths = slugs.map((item) => ({ params: { pid: item.node.handle } }));
  return {
    paths,
    fallback: `blocking`,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  const variables = { handle: `${ctx.params?.pid}` };
  const data = await queryClient.fetchQuery(useGetProductQuery.getKey(variables), useGetProductQuery.fetcher(variables));
  if (!data.productByHandle) {
    return {
      notFound: true,
    };
  }
  queryClient.setQueryData(useGetProductQuery.getKey(variables), data);
  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      dehydratedState,
    },
    revalidate: 10,
  };
};
