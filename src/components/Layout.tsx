import { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren<any>) => (
  <>
    <Header />
    <main className="bg-blue-500">{children}</main>
    <Footer />
  </>
);

export default Layout;
