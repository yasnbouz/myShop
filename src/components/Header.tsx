import useShopify from '@/hooks/useShopify';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from '@/components/Cart';

function Header() {
  const { totalItems, cartOpen, setCartOpen } = useShopify();

  return (
    <header className="bg-white border-b sticky top-0 z-4 w-full overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <nav aria-label="page-navigation" className="flex flex-row justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold cursor-pointer">
              My<span className="text-indigo-600">Shop</span>
            </a>
          </Link>
          <button type="button" data-testid="cart" className="cursor-pointer relative" onClick={() => setCartOpen(true)}>
            <AiOutlineShopping aria-hidden="true" size="32px" />
            <span
              suppressHydrationWarning
              role="note"
              aria-label={`${totalItems} in the cart`}
              className="absolute p-2 top-[-20%] right-[-60%] bg-black text-14px text-white rounded-full h-[24px] w-[24px] flex items-center justify-center overflow-hidden"
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
