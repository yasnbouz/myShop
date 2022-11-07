import { ProductOption } from '@/services/shopify/generated/types';

export const getProductOptions = (options: ProductOption[]) =>
  options.reduce((allOptions, option) => ({ ...allOptions, [option.name.toLowerCase()]: option.values[0].toLowerCase() }), {});
