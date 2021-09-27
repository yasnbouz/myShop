import { AppProps } from 'next/app';
import 'the-new-css-reset/css/reset.css';
// eslint-disable-next-line import/no-unresolved
import 'windi.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
