import { Product } from '@/services/shopify/generated/types';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrencyValue } from '@/utils/helpers';

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const { title, handle } = product;
  const { altText, originalSrc } = product.images.edges[0].node;
  const { amount } = product.priceRange.minVariantPrice;
  return (
    <article className="group">
      <Link href={`/products/${handle}`}>
        <a className="block bg-gray-200 rounded-3xl cursor-pointer overflow-hidden h-74 relative duration-500 group-hover:opacity-75">
          <Image src={originalSrc} layout="fill" alt={`${altText}`} objectFit="cover" />
        </a>
      </Link>
      <h2 className="text-gray-900 text-lg font-bold mt-2 ml-4">{title}</h2>
      <p className="text-gray-700 text-md font-medium mt-1 ml-4">{formatCurrencyValue.format(amount)}</p>
    </article>
  );
};

export default ProductCard;
