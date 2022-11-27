import { Button } from '@mui/material';
import classNames from 'classnames';
import { memo, useState } from 'react';
import styles from './styles.module.scss';

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
