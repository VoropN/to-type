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
  }
}

Amplify.configure(awsConfig);

const Login = () => {
  const [user, setUser] = useState<any>(null);
  const [customState, setCustomState] = useState(null);

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
    const initGapi = () => {
      const gapi = window.gapi;
      gapi.load('auth2', function () {
        gapi.auth2.init({
          client_id:
            '533677469724-4q8glcedf5hm5pl8g385nvspgtsn8p2a.apps.googleusercontent.com',
          scope: 'profile email openid',
        });
        gapi.signin2.render('gs2', {
          scope: 'email',
          width: 150,
          height: 25,
          longtitle: true,
          theme: 'dark',
        });
      });
    };

    if (!window.gapi?.auth2?.getAuthInstance?.())
      loadScript({
        url: 'https://apis.google.com/js/platform.js',
        onLoad: initGapi,
      });
  }, []);

  return (
    <div className="App">
      {user ? (
        <button id="name" onClick={() => Auth.signOut()}>
          Sign Out {user.getEmail()}
        </button>
      ) : (
        <div
          id="gs2"
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            })
          }
          className={styles.googleButton}
        >
          Sign in with Google
        </div>
      )}
    </div>
  );
};

export default memo(Login);
