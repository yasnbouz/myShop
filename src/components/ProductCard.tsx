import { useMoney } from '@/hooks/useMoney';
import NextImage from 'next/image';
import Link from 'next/link';
import type { Product } from '@/services/shopify/generated/types';

interface Props {
  product: Product;
}
function ProductCard({ product }: Props) {
  const { localizedMoney } = useMoney(product.priceRange.minVariantPrice);
  return (
    <article className="w-full">
      <Link href={`/products/${product?.handle}`} className="bg-gray-100 rounded-3xl overflow-hidden transition-opacity inline-block hover:opacity-75">
        <NextImage src={product?.featuredImage?.url ?? ``} alt={`${product?.featuredImage?.altText}`} width={315} height={296} className="h-[300px] object-cover" />
      </Link>
      <h3 title={product?.title} className="text-blue-gray-800 text-lg font-bold px-4 truncate text-ellipsis">
        {product?.title}
      </h3>
      <strong className="text-blue-gray-700 inline-block text-md font-semibold pl-4">{localizedMoney}</strong>
    </article>
  );
}

export default ProductCard;
