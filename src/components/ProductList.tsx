import { Product, useGetProductsInCollectionQuery } from '@/services/shopify/generated/types';
import { shopifyClient } from '@/services/shopify/lib/shopifyClient';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { data } = useGetProductsInCollectionQuery(shopifyClient, {
    handle: `frontpage`,
  });
  const products = data?.collectionByHandle?.products.edges ?? [];
  return (
    <div className="bg-[white]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Products</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:(grid-cols-4 gap-x-8)">
          {products.map((item) => {
            const product = item.node as Product;
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
