import { useMoney } from '@/hooks/useMoney';
import type { Product, Image } from '@/services/shopify/generated/types';
import NextImage from 'next/future/image';
import Link from 'next/link';

interface Props {
  product: Product;
}
function ProductCard({ product }: Props) {
  const { title, handle } = product;
  const { altText, url } = product.featuredImage as Image;
  const { minVariantPrice } = product.priceRange;
  const { localizedMoney } = useMoney(minVariantPrice);
  return (
    <article className="group">
      <Link href={`/products/${handle}`}>
        <a className="block bg-[#f6f6f6] rounded-3xl cursor-pointer overflow-hidden h-74 relative transition-opacity group-hover:opacity-75">
          <NextImage src={url} alt={`${altText}`} width={315} height={296} className="object-cover h-full" />
        </a>
      </Link>
      <h3 className="text-gray-900 text-lg font-bold mt-2 ml-4">{title}</h3>
      <strong className="text-gray-700 text-md font-semibold mt-1 ml-4">{localizedMoney}</strong>
    </article>
  );
}

export default ProductCard;
