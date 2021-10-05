import { Product } from '@/services/shopify/generated/types';
import { formatCurrencyValue } from '@/utils/helpers';
import { useState } from 'react';
import ProductOptions from './ProductOptions';

type ProductContentProps = {
  product: Product;
};
export type SelectedOptions = { [x: string]: string };

export default function ProductContent({ product }: ProductContentProps) {
  const defaultOptions = product.options.reduce((options, option) => ({ ...options, [option.name.toLowerCase()]: option.values[0].toLowerCase() }), {});
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(defaultOptions);
  return (
    <div>
      <h1 className="text-4xl mb-4 text-gray-900">{product.title}</h1>
      <p className="text-lg mb-4 text-gray-900 max-w-60ch">{product.description}</p>
      <p className="mb-8 text-2xl font-bold text-gray-900">{formatCurrencyValue.format(product.priceRange.minVariantPrice.amount)}</p>
      <ProductOptions product={product} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
      <button
        type="button"
        className="bg-black text-gray-200 min-w-360px text-center uppercase tracking-wide font-medium px-8 py-4 mt-8 rounded-lg hover:(bg-dark-900) active:(bg-dark-800)"
      >
        Add To Cart
      </button>
    </div>
  );
}
