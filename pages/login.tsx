import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter } from 'next/router';
import awsExports from 'src/aws-exports';
import { useEffect } from 'react';
import Profile from 'components/Profile';
import { Page } from 'components';
import { Button } from '@mui/material';
import styles from './Login.module.scss';
import classNames from 'classnames';
import SignInWithGoogle from 'components/SignIn/SignInWithGoogle';
Amplify.configure(awsExports);
const User = withAuthenticator(Profile);

const Login = () => {
  return (
    <Page>
      <div className={classNames(styles.container)}>
        <Button variant="outlined" color="warning" href="/">
          Home
        </Button>
        <SignInWithGoogle />
      </div>
      <User left />
    </Page>
  );
};

export default Login;
