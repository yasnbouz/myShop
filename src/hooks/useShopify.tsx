import { useCheckoutCreateMutation } from '@/services/shopify/generated/types';
import { shopifyClient } from '@/services/shopify/lib/shopifyClient';
import { useCart } from 'react-use-cart';

const useShopify = () => {
  const mutation = useCheckoutCreateMutation(shopifyClient);
  const cart = useCart();

  const checkout = async () => {
    const { items } = cart;
    const lineItems = items.map((item) => ({ quantity: item.quantity, variantId: item.id }));
    const { checkoutCreate } = await mutation.mutateAsync({ input: { lineItems } });

    window.open(`${checkoutCreate?.checkout?.webUrl}`, `_blank`);
  };

  return { ...cart, checkout };
};

export default useShopify;
