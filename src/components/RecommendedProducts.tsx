import { Product, ProductEdge } from '@/services/shopify/generated/types';
import ProductCard from './ProductCard';

type Props = {
  products: ProductEdge[];
  current: string | undefined;
};

const RecommendedProducts = ({ products, current }: Props) => (
  <div className="bg-[white]">
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Recommended Products</h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:(grid-cols-4 gap-x-8)">
        {products.map((item) => {
          const product = item.node as Product;
          if (item.node.id !== current) {
            return <ProductCard key={product.id} product={product} />;
          }
          return null;
        })}
      </div>
    </div>
  </div>
);

export default RecommendedProducts;
