import { Product } from '@/services/shopify/generated/types';
import Image from 'next/future/image';
import Link from 'next/link';
import { formatCurrencyValue } from '@/utils/helpers';

interface Props {
  product: Product;
}
function ProductCard({ product }: Props) {
  const { title, handle } = product;
  const { altText, originalSrc } = product.images.edges[0].node;
  const { amount } = product.priceRange.minVariantPrice;
  return (
    <article className="group">
      <Link href={`/products/${handle}`}>
        <a className="block bg-gray-200 rounded-3xl cursor-pointer overflow-hidden h-74 relative duration-500 group-hover:opacity-75">
          <Image src={originalSrc} alt={`${altText}`} fill className="object-cover" />
        </a>
      </Link>
      <h3 className="text-gray-900 text-lg font-bold mt-2 ml-4">{title}</h3>
      <p className="text-gray-700 text-md font-medium mt-1 ml-4">{formatCurrencyValue.format(amount)}</p>
    </article>
  );
}

export default ProductCard;
