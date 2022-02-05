import { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Button } from '@mui/material';
import { Auth, Hub } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

const Profile = ({ left }: { left?: boolean }) => {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data.attributes);
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'customOAuthState':
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser.attributes))
      .catch(() => console.log('Not signed in'));

    return unsubscribe;
  }, []);

  const singOut = () => {
    Auth.signOut();
  };
  return (
    <div className={classNames(styles.container, { [styles.left]: left })}>
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
        <>
          <Button size="small" variant="outlined" color="warning" href="/login">
            login
          </Button>
        </>
      )}
    </div>
  );
};

export default memo(Profile);
