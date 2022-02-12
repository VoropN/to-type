import Profile from 'components/Profile';
import { Page } from 'components';
import { Button } from '@mui/material';
import styles from './Login.module.scss';
import classNames from 'classnames';

const Login = () => {
  return (
    <Page>
      <div className={classNames(styles.container)}>
        <Button size="small" variant="outlined" color="warning" href="/">
          Home
        </Button>
      </div>
    </Page>
  );
};

export default Login;
