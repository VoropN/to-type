import React, { memo, useEffect, useRef, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsConfig from 'src/aws-exports';
import '@aws-amplify/ui-react/styles.css';
import styles from './styles.module.scss';
import { loadScript } from 'components/SignIn/utils/loadScript';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

Amplify.configure(awsConfig);

const SignInWithGoogle = () => {
  const [user, setUser] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [customState, setCustomState] = useState(null);
  const googleButton = useRef(null);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'customOAuthState':
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => console.log('Not signed in'));

    return unsubscribe;
  }, []);

  useEffect(() => {
    const renderGoogleButton = () => {
      setIsReady(true);
      window.google.accounts.id.initialize({
        client_id:
          '533677469724-4q8glcedf5hm5pl8g385nvspgtsn8p2a.apps.googleusercontent.com',
      });
      window.google.accounts.id.renderButton(googleButton.current, {
        theme: 'outline',
        size: 'medium',
      });
    };

    if (!window.gapi?.auth2?.getAuthInstance?.())
      loadScript({
        url: 'https://accounts.google.com/gsi/client',
        onLoad: renderGoogleButton,
      });
  }, []);

  if (user || !isReady) return null;

  return (
    <div
      ref={googleButton}
      onClick={() =>
        Auth.federatedSignIn({
          provider: CognitoHostedUIIdentityProvider.Google,
        })
      }
      className={styles.googleButton}
    >
      Sign in with Google
    </div>
  );
};

export default memo(SignInWithGoogle);
