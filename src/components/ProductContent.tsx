/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import * as R from 'rambda';
import clsx from 'clsx';
import { Product } from '@/services/shopify/generated/types';
import { getProductOptions } from '@/utils/helpers';
import useShopify from '@/hooks/useShopify';
import { useMoney } from '@/hooks/useMoney';
import ProductOptions from './ProductOptions';

type ProductContentProps = {
  product: Product;
};
export type SelectedOptions = { [x: string]: string };

export default function ProductContent({ product }: ProductContentProps) {
  const allProductVariants = product.variants.edges.map((variant) => {
    const options = variant.node.selectedOptions.reduce((acc, value) => ({ ...acc, [value.name.toLowerCase()]: value.value.toLowerCase() }), {});

    return {
      id: variant.node.id,
      handle: product.handle,
      name: product.title,
      price: parseFloat(variant.node.priceV2.amount),
      money: variant.node.priceV2,
      image: variant.node.image,
      availableForSale: variant.node.availableForSale,
      quantity: 1,
      options,
    };
  });
  const [selectedVariant, setselectedVariant] = useState(allProductVariants[0]);
  const defaultOptions = getProductOptions(product.options);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(defaultOptions);
  const { localizedMoney } = useMoney(selectedVariant.money);

  const { addItem, inCart } = useShopify();
  const isInCart = inCart(selectedVariant.id);
  const addToCart = () => {
    addItem(selectedVariant);
  };
  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name.toLowerCase()]: value.toLowerCase(),
    }));
    const condition = {
      ...selectedOptions,
      [name.toLowerCase()]: value.toLowerCase(),
    };
    R.forEach((item) => {
      const isEqual = R.equals(condition, item.options);
      if (isEqual) {
        setselectedVariant(item);
      }
    }, allProductVariants);
  };
  return (
    <div className="prose">
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <strong className="text-lg">{localizedMoney}</strong>
      <ProductOptions product={product} selectedOptions={selectedOptions} setSelectedOptions={handleOptionChange} />
      <button
        suppressHydrationWarning
        onClick={addToCart}
        type="button"
        disabled={!selectedVariant.availableForSale}
        className={clsx(
          `bg-black text-gray-200 text-center uppercase tracking-wide font-bold px-8 py-4 mt-8 rounded-lg sm:min-w-300px hover:(bg-dark-900) active:(bg-dark-800)`,
          !selectedVariant.availableForSale && `cursor-not-allowed disabled:(opacity-50)`,
        )}
      >
        {!selectedVariant.availableForSale ? `sold out!` : isInCart ? `add again` : `Add To Cart`}
      </button>
    </div>
  );
}
