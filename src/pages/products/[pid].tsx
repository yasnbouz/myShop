import Layout from '@/components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import ProductDetail from '@/components/ProductDetail';
import { getProduct, getProductsSlugs } from '@/services/shopify/api';
import { useGetProductQuery } from '@/services/shopify/generated/types';

export default function ProductPage() {
  const router = useRouter();

  if (router.isFallback) {
    return <p>loading ...</p>;
  }

  return (
    <div>
      <ProductDetail />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getProductsSlugs();
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
  await queryClient.prefetchQuery(useGetProductQuery.getKey(variables), getProduct(variables));
  const dehydratedState = dehydrate(queryClient);
  return {
    props: {
      dehydratedState,
    },
    revalidate: 10,
  };
};
ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
