import { Button } from '@mui/material';
import classNames from 'classnames';
import { Page } from 'components';
import styles from './Login.module.scss';

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
