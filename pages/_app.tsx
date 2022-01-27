import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Amplify from 'aws-amplify';
import config from 'src/aws-exports.js';

// Amplify SSR configuration needs to be done within each API route
Amplify.configure({ ...config, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
