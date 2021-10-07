import Link from 'next/link';

const routes = [
  { name: `About`, href: `#` },
  { name: `Shop`, href: `#` },
  { name: `Jobs`, href: `#` },
  { name: `Terms of use`, href: `#` },
];

const Footer = () => (
  <footer>
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap flex-row space-x-8 justify-center">
        {routes.map((route) => (
          <Link href={route.href} key={route.name}>
            <a className="cursor-pointer text-gray-500 hover:(text-gray-900)">{route.name}</a>
          </Link>
        ))}
      </div>
      <p className="text-center mt-4">&copy; {new Date().getFullYear()} MyShop.com - All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
