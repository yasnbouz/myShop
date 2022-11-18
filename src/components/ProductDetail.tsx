import type { Product, ProductEdge } from '@/services/shopify/generated/types';
import { useGetProductQuery } from '@/services/shopify/generated/types';
import { useRouter } from 'next/router';

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
    <div className="bg-[white]">
      <div className="container mx-auto px-6 py-16">
        <ProductContent product={product as Product} />
      </div>
      <RecommendedProducts current={product?.id} products={product?.collections.edges[0].node.products.edges as ProductEdge[]} />
    </div>
  );
}
export default ProductDetail;
