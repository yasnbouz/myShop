import useShopify from '@/hooks/useShopify';
import Link from 'next/link';
import Cart from '@/components/Cart';

function Header() {
  const { totalItems, cartOpen, setCartOpen } = useShopify();

  return (
    <header className="bg-white border-b border-light-600 sticky top-0 z-4 w-full overflow-hidden">
      <div className="container mx-auto px-6 py-8">
        <nav aria-label="page-navigation" className="flex flex-row justify-between items-center">
          <Link href="/">
            <span className="text-indigo-800 text-2xl font-bold">
              My<span className="text-indigo-600">Shop</span>
            </span>
          </Link>
          <button type="button" data-testid="cart" className="relative" onClick={() => setCartOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span
              suppressHydrationWarning
              role="note"
              aria-label={`${totalItems} in the cart`}
              className="absolute p-2 top-[-20%] right-[-60%] bg-blue-gray-900 text-14px text-white rounded-full h-[24px] w-[24px] flex items-center justify-center overflow-hidden"
            >
              {totalItems}
            </span>
          </button>
        </nav>
      </div>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </header>
  );
}

export default Header;
