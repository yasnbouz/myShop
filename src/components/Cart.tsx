import { Dispatch, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MdClose } from 'react-icons/md';
import { IoTrashOutline } from 'react-icons/io5';
import Link from 'next/link';
import useShopify from '@/hooks/useShopify';
import Image from 'next/future/image';
import { formatCurrencyValue } from '@/utils/helpers';
import { colord } from 'colord';

type CartProps = {
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
};
export default function Example({ cartOpen, setCartOpen }: CartProps) {
  const { items, removeItem, cartTotal, updateItemQuantity, checkout, isEmpty } = useShopify();
  return (
    <Transition show={cartOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden z-5" onClose={setCartOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setCartOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <MdClose className="h-6 w-6 align-middle" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {isEmpty ? (
                          <p className="text-lg text-center mt-80">Nothing in your cart!</p>
                        ) : (
                          <ul className="-my-6 divide-y divide-gray-200">
                            {items.map((product) => (
                              <li key={product.id} className="py-6 flex">
                                <Link href={`/products/${product.handle}`}>
                                  <a className="relative cursor-pointer flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                    <Image src={product.image.originalSrc} alt={product.image.altText} width={94} height={94} className="object-cover" />
                                  </a>
                                </Link>
                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{product.name}</h3>
                                      <p className="ml-4">{formatCurrencyValue.format(product.price * Number(product.quantity))}</p>
                                    </div>
                                    <p className="mt-1 space-x-4 flex flex-row items-center">
                                      <span className="h-6 w-6 border inline-block rounded-full" style={{ backgroundColor: colord(product.options.color).toHslString() }} />
                                      <span className="border-1 px-2 text-sm rounded-sm">{String(product.options.size).toUpperCase()}</span>
                                    </p>
                                  </div>
                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex space-x-4">
                                      <button
                                        type="button"
                                        className="border border-light-900 rounded-sm h-6 w-6 text-center"
                                        onClick={() => updateItemQuantity(product.id, Number(product.quantity) - 1)}
                                      >
                                        -
                                      </button>
                                      <p className="text-gray-500">Qty {product.quantity}</p>
                                      <button
                                        type="button"
                                        className="border border-light-900 rounded-sm h-6 w-6 text-center"
                                        onClick={() => updateItemQuantity(product.id, Number(product.quantity) + 1)}
                                      >
                                        +
                                      </button>
                                    </div>

                                    <div className="flex">
                                      <button onClick={() => removeItem(product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        <IoTrashOutline size={24} className="text-red-600" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{formatCurrencyValue.format(cartTotal)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={checkout}
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{` `}
                        <button type="button" className="text-indigo-600 font-medium hover:text-indigo-500" onClick={() => setCartOpen(false)}>
                          Continue Shopping<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
