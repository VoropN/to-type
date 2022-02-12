import { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Button } from '@mui/material';

const Profile = ({ left }: { left?: boolean }) => {
  const [user, setUser] = useState<null | { email: string }>(null);
  const [customState, setCustomState] = useState(null);

  const singOut = () => {};
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
