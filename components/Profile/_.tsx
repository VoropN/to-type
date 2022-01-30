import { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Button } from '@mui/material';
import { Auth } from 'aws-amplify';
import SignInWithGoogle from 'components/SignIn/SignInWithGoogle';

const Profile = () => {
  const [user, setUser] = useState<null | { email: string }>(null);
  useEffect(() => {
    const getUser = async () => {
      setUser((await Auth.currentAuthenticatedUser()).attributes);
    };
    getUser();
  }, []);

  const singOut = async () => {
    await Auth.signOut();
    setUser(null);
  };
  return (
    <div className={classNames(styles.container)}>
      <SignInWithGoogle />

      {user ? (
        <>
          <div className={styles.userData}>{user.email}</div>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={singOut}
          >
            SinOut
          </Button>
        </>
      ) : (
        <Button variant="outlined" color="warning" href="/login">
          login
        </Button>
      )}
    </div>
  );
};

export default memo(Profile);
