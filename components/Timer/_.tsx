import { ChangeEvent, memo, useCallback, useEffect, useRef } from 'react';
import { ITimerProps } from 'types/IHomePage';
import { Button } from '@mui/material';

const startTimer = ({
  time,
  setTime,
}: {
  time: number;
  setTime: (time: number) => void;
}) => {
  const start = Date.now() - time;
  const currentTimer = setInterval(() => {
    setTime(Date.now() - start);
  }, 1000);
  return () => {
    clearInterval(currentTimer);
  };
};

const Timer = ({
  setShouldStart,
  updatedVersion,
  time,
  setTime,
  shouldStart,
}: ITimerProps) => {
  const clearIntervalTimer = useRef<any>(null);
  const stopTimer = useCallback(() => {
    clearIntervalTimer.current?.();
    clearIntervalTimer.current = null;
    setShouldStart(false);
  }, [setShouldStart, clearIntervalTimer]);

  useEffect(() => {
    const inputFunc = (event: KeyboardEvent) => {
      const { key } = event;
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (key) {
        case 'Esc': // IE/Edge specific value
        case 'Escape':
          stopTimer();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
      event?.preventDefault();
    };
    window.addEventListener('keydown', inputFunc, true);
    return () => window.removeEventListener('keydown', inputFunc, true);
  }, [stopTimer]);

  useEffect(() => {
    if (shouldStart && !clearIntervalTimer.current) {
      clearIntervalTimer.current = startTimer({ time, setTime });
    }
  }, [shouldStart, setTime]);

  useEffect(() => {
    const currentTimer = setTimeout(() => {
      clearIntervalTimer.current?.();
      clearIntervalTimer.current = null;
      setShouldStart(false);
    }, 3000);
    return () => {
      clearTimeout(currentTimer);
    };
  }, [shouldStart, updatedVersion, setShouldStart]);

  return (
    <Button
      variant="contained"
      color={shouldStart ? 'warning' : 'primary'}
      size="small"
      onClick={(event: ChangeEvent<any>) => {
        event.target?.blur();
        shouldStart ? stopTimer() : setShouldStart(true);
      }}
    >
      {shouldStart ? 'Stop' : 'Start'}
    </Button>
  );
};

export default memo(Timer);
