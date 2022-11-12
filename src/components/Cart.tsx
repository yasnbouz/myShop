import type { Dispatch, SetStateAction } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import useShopify from '@/hooks/useShopify';
import Image from 'next/future/image';
import { colord } from 'colord';
import { useMoney } from '@/hooks/useMoney';
import { CurrencyCode } from '@/services/shopify/generated/types';
import type { ProductVariantType } from '@/utils/helpers';

type CartProps = {
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Cart({ cartOpen, setCartOpen }: CartProps) {
  const { items, removeItem, cartTotal, updateItemQuantity, checkout, isEmpty } = useShopify();
  const { defaultFormatter } = useMoney({ amount: `0`, currencyCode: CurrencyCode.Usd });
  const products = items as ProductVariantType[];
  const cartHeader = (
    <div className="flex items-stretch justify-between">
      <Dialog.Title className="text-lg font-semibold text-gray-900">Shopping cart</Dialog.Title>
      <div className="flex items-center">
        <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setCartOpen(false)}>
          <span className="sr-only">Close panel</span>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
  const cartProducts = products.map((product) => (
    <li key={product.id} className="py-6 flex">
      <Link href={`/products/${product.handle}`} prefetch={false}>
        <a className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
          <Image src={product?.image?.url ?? ``} alt={product?.image?.altText ?? ``} width={94} height={94} className="object-cover h-full" />
        </a>
      </Link>
      <div className="pl-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-blue-gray-900">
            <h3>{product.title}</h3>
            <p className="ml-4">{defaultFormatter().format(product.price * Number(product.quantity))}</p>
          </div>
          <p className="space-x-3 flex flex-row items-center">
            {product.selectedOptions.map((option) => {
              if (option.name.toLowerCase() === `color`) {
                return (
                  <span
                    key={`${option.name} ${option.value}`}
                    className="h-6 w-6 border inline-block rounded-full border-light-900"
                    style={{ backgroundColor: colord(option.value).toHslString() }}
                  />
                );
              }
              return (
                <span key={`${option.name} ${option.value}`} className="border border-light-900 px-2 text-sm rounded-sm">
                  {String(option.value).toUpperCase()}
                </span>
              );
            })}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex space-x-4">
            <button type="button" className="border border-light-900 rounded-sm h-6 w-6 text-center" onClick={() => updateItemQuantity(product.id, Number(product.quantity) - 1)}>
              -
            </button>
            <p className="text-gray-500">Qty {product.quantity}</p>
            <button type="button" className="border border-light-900 rounded-sm h-6 w-6 text-center" onClick={() => updateItemQuantity(product.id, Number(product.quantity) + 1)}>
              +
            </button>
          </div>

          <div className="flex">
            <button name="trash" onClick={() => removeItem(product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-600">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  ));
  const cartFooter = (
    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
      <div className="flex justify-between text-base font-semibold text-blue-gray-900">
        <strong>Subtotal</strong>
        <strong>{defaultFormatter().format(cartTotal)}</strong>
      </div>
      <em className="mt-0.5 text-sm font-medium text-gray-500">Shipping and taxes calculated at checkout.</em>
      <div className="mt-6">
        <button
          type="button"
          className="w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-bold text-center text-white bg-indigo-600 hover:bg-indigo-700"
          onClick={checkout}
        >
          Checkout
        </button>
      </div>
      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
        <p>
          or{` `}
          <button type="button" className="text-indigo-600 font-semibold hover:text-indigo-500" onClick={() => setCartOpen(false)}>
            Continue Shopping<span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
  return (
    <Transition show={cartOpen} as={Fragment}>
      <Dialog as="div" className="fixed overflow-hidden inset-0 z-5" onClose={setCartOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-y-0 right-0 pl-10 flex">
          <Transition.Child
            as={Fragment}
            enter="transition transform duration-500 sm:duration-700"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition transform duration-500 sm:duration-700"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                  {cartHeader}
                  <div className="mt-8">
                    <div className="flow-root">{isEmpty ? <p className="text-lg text-center mt-80">Nothing in your cart!</p> : cartProducts}</div>
                  </div>
                </div>

                {cartFooter}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
