import type { Image, Maybe, MoneyV2, Product, SelectedOption } from '@/services/shopify/generated/types';

export type ProductOptionsType = {
  [key in string]: string;
};
export type ProductVariantType = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceV2: MoneyV2;
  image: Maybe<Image> | undefined;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: number;
  quantity: number;
};
export const getProductOptions = (options: SelectedOption[]) =>
  options.reduce((memo: ProductOptionsType, option) => {
    // eslint-disable-next-line no-param-reassign
    memo[option.name.toLowerCase()] = option.value.toLowerCase();
    return memo;
  }, {});

export function getAllVariants(product: Product): ProductVariantType[] {
  if (!product.variants) {
    throw new Error(`getAllVariants() require default product variants!`);
  }
  return product.variants.edges.map((variant) => ({
    id: variant.node.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    priceV2: variant.node.priceV2,
    image: variant.node.image,
    availableForSale: variant.node.availableForSale,
    selectedOptions: variant.node.selectedOptions,
    price: parseFloat(variant.node.priceV2.amount),
    quantity: 1,
  }));
}
export function getSelectedVariant(variants: ProductVariantType[], params: ProductOptionsType) {
  if (!variants) return null;
  return variants.find((variant) =>
    Object.entries(params).every(([paramName, paramValue]) =>
      variant?.selectedOptions?.some((option) => option?.name?.toLowerCase() === paramName && option?.value?.toLowerCase() === paramValue),
    ),
  );
}
export function getVariantBasedOnIdProp(variantId: string | undefined, variants: ProductVariantType[]) {
  if (variantId) {
    const foundedVariant = variants.find((variant) => variant.id === variantId);
    if (!foundedVariant) {
      throw new Error(`<ProductContent/>: this product variant not found!`);
    }
    return foundedVariant;
  }
  if (variantId === null) return null;
  return variants.find((variant) => variant?.availableForSale === true) ?? variants[0];
}
