import Link from 'next/link';

const routes = [
  { name: `About`, href: `#` },
  { name: `Shop`, href: `#` },
  { name: `Jobs`, href: `#` },
  { name: `Terms of use`, href: `#` },
];

function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-6 py-8">
        <nav className="flex flex-wrap flex-row space-x-8 justify-center">
          {routes.map((route) => (
            <Link href={route.href} key={route.name} className=" text-blue-gray-600 hover:(text-blue-gray-900)">
              {route.name}
            </Link>
          ))}
        </nav>
        <p className="font-medium text-blue-gray-800 text-center mt-4">&copy; {new Date().getFullYear()} MyShop.com - All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
