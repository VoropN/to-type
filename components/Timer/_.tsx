import {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface ITimer {
  name: string;
  shouldUpdate: any;
  shouldStart: boolean;
  onUpdate: ({ time }: { time: number }) => void;
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
  onUpdate,
  shouldStart,
  name,
}: ITimer) => {
  const timerName = useMemo(() => `timer-${name}`, [name]);
  const [time, setTime] = useState(0);
  const clearIntervalTimer = useRef<any>(null);

  useEffect(() => {
    setTime(Number(localStorage.getItem(timerName) || 0));
  }, [timerName]);

  useEffect(() => {
    const inputFunc = (event: KeyboardEvent) => {
      const { key } = event;
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (key) {
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
    };
    window.addEventListener("keydown", inputFunc, true);
    return () => window.removeEventListener("keydown", inputFunc, true);
  }, [setShouldStart, clearIntervalTimer]);

  useEffect(() => {
    onUpdate({ time });
    localStorage.setItem(timerName, String(time));
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
    };
  }, [shouldStart, shouldUpdate]);
  console.log(shouldStart, shouldUpdate);
  return (
    <div>
      <h4>Time: {(time / 1000).toFixed(0)}</h4>
      <button
        className={classNames(styles.timerButton, {
          [styles.timerButtonStop]: shouldStart,
        })}
        onClick={() => setShouldStart(!shouldStart)}
      >
        {shouldStart ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default memo(Timer);
