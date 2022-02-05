import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Amplify from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import config from 'src/aws-exports';

// Amplify SSR configuration needs to be done within each API route
Amplify.configure({ ...config, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <Component {...pageProps} />
    </Authenticator.Provider>
  );
}

export default MyApp;
