import { memo, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from './Timer.module.scss';

type ITimer = {
  shouldUpdate: any;
  shouldStart: boolean;
  onUpdate: ({ time }: { time: number; }) => void;
  setShouldStart: (isTrue: boolean) => void;
};

const startTimer = ({ time, setTime }: { time: number; setTime: (time: number) => void }) => {
  const start = Date.now() - time;
  const currentTimer = setInterval(() => {
    setTime(Date.now() - start);
  }, 1000);
  return () => {
    clearInterval(currentTimer);
  }
};

export const Timer = memo(({ setShouldStart, shouldUpdate, onUpdate, shouldStart }: ITimer) => {
  const [time, setTime] = useState(0);
  const clearIntervalTimer = useRef<any>(null);

  useEffect(() => {
    setTime(Number(localStorage.getItem('time') || 0));
  }, []);

  useEffect(() => {
    const inputFunc = (event: KeyboardEvent) => {
      const { key } = event;
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (event.key) {
        case "Esc": // IE/Edge specific value
        case "Escape":
          clearIntervalTimer.current?.();
          clearIntervalTimer.current = null;
          setShouldStart(false);
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
      event?.preventDefault();
    }
    window.addEventListener("keydown", inputFunc, true);
    return () => window.removeEventListener("keydown", inputFunc, true);
  }, []);

  useEffect(() => {
    onUpdate({ time });
    localStorage.setItem('time', String(time));
  }, [time]);

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
    }
  }, [shouldStart, shouldUpdate]);

  return (
    <div>
      <h4>Time: {(time / 1000).toFixed(0)}</h4>
      <button
        className={classNames(styles.timerButton, { [styles.timerButtonStop]: shouldStart })}
        onClick={() => setShouldStart(!shouldStart)}>
        {shouldStart ? 'Stop' : 'Start'}
      </button>
    </div>
  );
});
