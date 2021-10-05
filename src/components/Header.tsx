import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

const Header = () => (
  <header className="bg-white border-b sticky top-0 z-4 w-full overflow-hidden">
    <div className="container mx-auto px-4 py-8">
      <nav className="flex flex-row justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold cursor-pointer">
            My<span className="text-indigo-600">Shop</span>
          </a>
        </Link>
        <Link href="/cart">
          <a className="cursor-pointer relative">
            <AiOutlineShopping size="32px" />
            <span className="absolute p-2 top-[-20%] right-[-60%] bg-black text-14px text-white rounded-full h-[24px] w-[24px] flex items-center justify-center overflow-hidden">
              0
            </span>
          </a>
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
