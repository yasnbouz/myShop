import { Product, ProductEdge, useGetProductQuery } from '@/services/shopify/generated/types';
import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';
import { defaultUrl } from 'next-seo.config';
import ProductContent from './ProductContent';
import RecommendedProducts from './RecommendedProducts';

function ProductDetail() {
  const router = useRouter();
  const variables = { handle: `${router.query.pid}` };
  const { data, status } = useGetProductQuery(variables);
  const product = data?.product;

  if (status === `loading`) {
    return <p className="text-center py-8">Fetching product...</p>;
  }
  if (!data?.product) {
    return <p className="text-center py-8">Product not found</p>;
  }

  return (
    <>
      <div className="bg-[white]">
        <div className="container mx-auto px-4 py-16">
          <ProductContent product={product as unknown as Product} />
        </div>
        <RecommendedProducts current={product?.id} products={product?.collections.edges[0].node.products.edges as ProductEdge[]} />
      </div>
      <NextSeo
        title={product?.title}
        description={product?.description}
        openGraph={{
          url: `${defaultUrl}/${variables.handle}`,
          images: [{ url: product?.images.edges[0].node.url as string, width: 800, height: 600, alt: product?.images.edges[0].node.altText as string }],
        }}
      />
    </>
  );
}
export default ProductDetail;
