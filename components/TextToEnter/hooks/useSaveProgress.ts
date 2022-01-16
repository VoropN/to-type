import { Dispatch, SetStateAction, useEffect } from 'react';
import { IUpdateActivePage } from './useActivePage';
import { getCurrentPage } from '../helpers/getCurrentPage';
import { ITextOptions } from 'types/ILoadText';

interface IUseSaveProgress {
  textOptions: ITextOptions;
  setPosition: Dispatch<SetStateAction<number>>;
  setTypoCounter: Dispatch<SetStateAction<number>>;
  setSpeedCounter: Dispatch<SetStateAction<number>>;
  setPressedLetter: Dispatch<SetStateAction<string>>;
  updateActivePage: IUpdateActivePage;
  setTypedCounter: Dispatch<SetStateAction<number>>;
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
  typedCounter: number;
  typoCounter: number;
  speedCounter: number;
  position: number;
  updatedVersion: number;
}

export const useSaveProgress = ({
  textOptions,
  setTime,
  time,
  setPosition,
  setTypoCounter,
  setSpeedCounter,
  setPressedLetter,
  updateActivePage,
  setTypedCounter,
  typedCounter,
  typoCounter,
  speedCounter,
  position,
  updatedVersion,
}: IUseSaveProgress) => {
  const storedName = `progress-${textOptions.name}`;

  useEffect(() => {
    const progress = JSON.parse(
      localStorage.getItem(storedName) ||
        '{"position": 0, "typedCounter": 0, "typoCounter": 0, "speedCounter": 0, "time": 0}'
    );
    setPosition(progress.position);
    setTypoCounter(progress.typoCounter);
    setTypedCounter(progress.typedCounter);
    setTime(progress.time);
    setSpeedCounter(progress.speedCounter);
    setPressedLetter('');
    updateActivePage({
      currentPage: getCurrentPage({ position: progress.position }),
      forceUpdate: true,
    });
  }, [textOptions]);

  useEffect(() => {
    localStorage.setItem(
      storedName,
      JSON.stringify({
        position,
        typedCounter,
        typoCounter,
        speedCounter,
        time,
      })
    );
  }, [updatedVersion, position, time]);
};
