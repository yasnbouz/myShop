import { useCheckoutCreateMutation } from '@/services/shopify/generated/types';
import { useState } from 'react';
import { useCart } from 'react-use-cart';

const useShopify = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const mutation = useCheckoutCreateMutation();
  const cart = useCart();

  const checkout = async () => {
    const { items } = cart;
    const lineItems: any = items.map((item) => ({ quantity: item.quantity, variantId: item.id }));
    const { checkoutCreate } = await mutation.mutateAsync({ input: { lineItems } });

    window.open(`${checkoutCreate?.checkout?.webUrl}`, `_blank`);
  };

  return { ...cart, checkout, cartOpen, setCartOpen };
};

export default useShopify;
