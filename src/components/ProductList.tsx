import type { Product } from '@/services/shopify/generated/types';
import { useGetProductsInCollectionQuery } from '@/services/shopify/generated/types';
import ProductCard from './ProductCard';

function ProductList() {
  const { data } = useGetProductsInCollectionQuery({
    handle: `frontpage`,
  });
  const products = data?.collection?.products.edges ?? [];
  return (
    <div className="bg-[white]">
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-extrabold text-blue-gray-800 mb-6">New Arrivals</h2>
        <div className="grid gap-6 justify-items-center grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:justify-items-start lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {products.map((item) => {
            const product = item.node as Product;
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default ProductList;
