/* eslint-disable no-nested-ternary */
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import type { Product } from '@/services/shopify/generated/types';
import useShopify from '@/hooks/useShopify';
import { useMoney } from '@/hooks/useMoney';
import NextImage from 'next/future/image';
import { getAllVariants, getProductOptions, getSelectedVariant, getVariantBasedOnIdProp } from '@/utils/helpers';
import { NextSeo } from 'next-seo';
import { defaultUrl } from 'next-seo.config';
import ProductOptions from './ProductOptions';

type ProductContentProps = {
  product: Product;
};

export default function ProductContent({ product }: ProductContentProps) {
  const variants = useMemo(() => getAllVariants(product), [product]);
  const [selectedVariant, setSelectedVariant] = useState(() => getVariantBasedOnIdProp(undefined, variants));
  if (!selectedVariant) {
    throw new Error(`Product variant not selected!`);
  }
  const [selectedOptions, setSelectedOptions] = useState(() => getProductOptions(selectedVariant.selectedOptions));
  const { localizedMoney } = useMoney(selectedVariant.priceV2);
  const { addItem, inCart } = useShopify();
  let isFirstImage = true;
  const isInCart = inCart(selectedVariant.id);
  const addToCart = () => {
    addItem(selectedVariant);
  };
  const setSelectedOption = (name: string, value: string) => {
    const opts = { ...selectedOptions, [name.toLowerCase()]: value.toLowerCase() };
    const variant = getSelectedVariant(variants, opts);
    if (variant) {
      setSelectedOptions(opts);
      setSelectedVariant(variant);
      isFirstImage = false;
    }
  };
  return (
    <div className="flex flex-col space-y-4 lg:(flex-row space-y-0 items-start space-x-8) xl:(space-x-20)">
      <div className="bg-gray-100 rounded-3xl relative overflow-hidden min-h-[400px] md:min-h-[550px] lg:(flex-[1_1_50%])">
        <NextImage
          src={`${selectedVariant?.image?.url ?? ``}`}
          alt={`${selectedVariant?.image?.altText ?? selectedVariant?.title ?? ``}`}
          className="object-cover"
          sizes="(max-width: 1024px) 100vw,50vw"
          fill
          priority={isFirstImage}
        />
      </div>
      <div className="flex flex-col gap-y-8 items-start lg:(flex-[1_1_min(50%,65ch)])">
        <div>
          <h1 className="pb-2 font-extrabold text-blue-gray-800">{selectedVariant?.title ?? `Product Title`}</h1>
          <strong className="font-bold text-blue-gray-600">{localizedMoney ?? NaN}</strong>
        </div>
        <p className="text-lg text-blue-gray-600">{selectedVariant?.description ?? `Product description`}</p>
        <ProductOptions options={product?.options ?? []} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOption} />
        <button
          suppressHydrationWarning
          onClick={addToCart}
          type="button"
          disabled={!selectedVariant?.availableForSale}
          className={clsx(
            `bg-blue-gray-900 text-blue-gray-200 text-center uppercase tracking-wide font-bold px-8 py-4 rounded-lg sm:min-w-300px hover:(bg-blue-gray-800) active:(bg-blue-gray-900)`,
            !selectedVariant?.availableForSale && `disabled:(opacity-50)`,
          )}
        >
          {!selectedVariant?.availableForSale ? `sold out!` : isInCart ? `add again` : `Add To Cart`}
        </button>
      </div>
      <NextSeo
        title={selectedVariant?.title}
        description={selectedVariant?.description}
        openGraph={{
          url: `${defaultUrl}/${selectedVariant?.handle}`,
          images: [{ url: selectedVariant?.image?.url ?? ``, width: 800, height: 600, alt: selectedVariant?.image?.altText ?? selectedVariant?.title ?? `` }],
        }}
      />
    </div>
  );
}
