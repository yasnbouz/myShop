import type { Product, ProductEdge } from '@/services/shopify/generated/types';
import ProductCard from './ProductCard';

type Props = {
  products: ProductEdge[];
  current: string | undefined;
};

function RecommendedProducts({ products, current }: Props) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-extrabold text-blue-gray-800 mb-6">Recommended Products</h2>
      <div className="grid gap-6 justify-items-center grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:justify-items-start lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {products.map((item) => {
          const product = item.node as Product;
          if (item.node.id !== current) {
            return <ProductCard key={product.id} product={product} />;
          }
          return null;
        })}
      </div>
    </section>
  );
}

export default RecommendedProducts;
