import React, { memo, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

declare global {
  interface Window {
    gapi: any;
  }
}

const SignInWithGoogle = () => {
  const [ga, setGa] = useState();

  const initGapi = () => {
    // init the Google SDK client
    setGa(window.gapi);
    const g = window.gapi;
    g.load('auth2', function () {
      g.auth2.init({
        client_id:
          '533677469724-4q8glcedf5hm5pl8g385nvspgtsn8p2a.apps.googleusercontent.com',
        // authorized scopes
        scope: 'profile email openid',
      });
    });
  };

  const createScript = () => {
    // load the Google SDK
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.onload = initGapi;
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!ga) return;
    window.gapi.signin2.render('gs2', {
      scope: 'email',
      width: 150,
      height: 25,
      longtitle: true,
      theme: 'dark',
      // onsuccess: onGoogleSignIn,
    });
  }, [ga]);

  useEffect(() => {
    const ga = window?.gapi?.auth2?.getAuthInstance?.() || null;

    if (!ga) createScript();
  }, []);

  const signIn = () => {
    window.gapi?.auth2
      .getAuthInstance()
      ?.signIn()
      .then(
        (googleUser: any) => {
          getAWSCredentials(googleUser);
        },
        (error: any) => {
          console.log(error);
        }
      );
  };

  const getAWSCredentials = async (googleUser: any) => {
    const { id_token, expires_at } = googleUser.getAuthResponse();
    const profile = googleUser.getBasicProfile();
    let user = {
      email: profile.getEmail(),
      name: profile.getName(),
    };

    const credentials = await Auth.federatedSignIn(
      'google',
      { token: id_token, expires_at },
      user
    );
    console.log('credentials', credentials);
  };

  return (
    <div id="gs2" onClick={signIn} style={{ marginTop: 5 }}>
      Sign in with Google
    </div>
  );
};

export default memo(SignInWithGoogle);
