import { ChangeEvent, memo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';

interface INewSession {
  switchProps: {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  onStartSession: (event: ChangeEvent<any>) => void;
  isShowSwitcher: boolean;
}

const NewSession = ({
  switchProps,
  onStartSession,
  isShowSwitcher,
}: INewSession) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.onlySession]: !isShowSwitcher,
      })}
    >
      <Button
        color={isShowSwitcher ? 'warning' : 'primary'}
        size="small"
        variant={isShowSwitcher ? 'outlined' : 'contained'}
        onClick={onStartSession}
      >
        New session
      </Button>
      {isShowSwitcher && (
        <FormGroup>
          <FormControlLabel
            className={styles.control}
            control={<Switch color="warning" {...switchProps} />}
            label={switchProps.checked ? 'Session' : ''}
          />
        </FormGroup>
      )}
    </div>
  );
};

export default memo(NewSession);
