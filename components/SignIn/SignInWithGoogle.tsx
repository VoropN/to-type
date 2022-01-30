import React, { memo, useEffect, useState } from 'react';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsConfig from 'src/aws-exports';

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

  return (
    <div className="App">
      <button
        onClick={() =>
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          })
        }
      >
        Open Google
      </button>
      <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
      {user && (
        <button onClick={() => Auth.signOut()}>
          Sign Out {user.getUsername()}
        </button>
      )}
    </div>
  );
};

export default memo(Login);
