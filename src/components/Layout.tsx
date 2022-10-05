import { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }: PropsWithChildren<any>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
