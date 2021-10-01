import Layout from '@/components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { getSdk, useGetProductDetailQuery } from '@/services/shopify/generated/types';
import { shopifyClient } from '@/services/shopify/lib/shopifyClient';
import { dehydrate, QueryClient } from 'react-query';
import ProductDetail from '@/components/ProductDetail';

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
  const data = await getSdk(shopifyClient).getProductsSlug();
  const slugs = data.products?.edges ?? [];
  const paths = slugs.map((item) => ({ params: { pid: item.node.handle } }));
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();
  const sdk = getSdk(shopifyClient);
  const variables = { handle: `${ctx.params?.pid}` };
  await queryClient.prefetchQuery(useGetProductDetailQuery.getKey(variables), () => sdk.getProductDetail(variables));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
