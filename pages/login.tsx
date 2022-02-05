import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Profile from 'components/Profile';
import { Page } from 'components';
import { Button } from '@mui/material';
import styles from './Login.module.scss';
import classNames from 'classnames';
const User = withAuthenticator(Profile);

const Login = () => {
  return (
    <Page>
      <div className={classNames(styles.container)}>
        <Button size="small" variant="outlined" color="warning" href="/">
          Home
        </Button>
      </div>
      <User left />
    </Page>
  );
};

export default Login;
