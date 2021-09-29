import { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }: PropsWithChildren<any>) => (
  <div className="flex flex-col h-screen">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
