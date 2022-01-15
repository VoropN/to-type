import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface ITimer {
  name: string;
  className?: string;
  shouldUpdate: any;
  shouldStart: boolean;
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
  setShouldStart: Dispatch<SetStateAction<boolean>>;
}

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
  shouldUpdate,
  time,
  setTime,
  shouldStart,
  className,
}: ITimer) => {
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
  }, [shouldStart]);

  useEffect(() => {
    const currentTimer = setTimeout(() => {
      clearIntervalTimer.current?.();
      clearIntervalTimer.current = null;
      setShouldStart(false);
    }, 3000);
    return () => {
      clearTimeout(currentTimer);
    };
  }, [shouldStart, shouldUpdate]);

  return (
    <button
      className={classNames(className, styles.timerButton, {
        [styles.timerButtonStop]: shouldStart,
      })}
      onClick={(event: any) => {
        event.target?.blur();
        shouldStart ? stopTimer() : setShouldStart(true);
      }}
    >
      {shouldStart ? 'Stop' : 'Start'}
    </button>
  );
};

export default memo(Timer);
