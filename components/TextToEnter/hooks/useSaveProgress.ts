import { Dispatch, SetStateAction, useEffect } from 'react';
import { ITextOptions } from '../../LoadFile';

interface IUseSaveProgress {
  textOptions: ITextOptions;
  setPosition: Dispatch<SetStateAction<number>>;
  setTypoCounter: Dispatch<SetStateAction<number>>;
  setSpeedCounter: Dispatch<SetStateAction<number>>;
  setPressedLetter: Dispatch<SetStateAction<string>>;
  updateActivePage: ({ position }: { position: number }) => void;
  pressedLetter: string;
  setTypedCounter: Dispatch<SetStateAction<number>>;
  typedCounter: number;
  typoCounter: number;
  speedCounter: number;
  position: number;
}

export const useSaveProgress = ({
  textOptions,
  setPosition,
  setTypoCounter,
  setSpeedCounter,
  setPressedLetter,
  updateActivePage,
  pressedLetter,
  setTypedCounter,
  typedCounter,
  typoCounter,
  speedCounter,
  position,
}: IUseSaveProgress) => {
  const storedName = `progress-${textOptions.name}`;

  useEffect(() => {
    const progress = JSON.parse(
      localStorage.getItem(storedName) ||
        '{"position": 0, "typedCounter": 0, "typoCounter": 0, "speedCounter": 0}'
    );
    setPosition(progress.position);
    setTypoCounter(progress.typoCounter);
    setTypedCounter(progress.typedCounter);
    setSpeedCounter(progress.speedCounter);
    setPressedLetter('');
    updateActivePage({ position: progress.position });
  }, [textOptions]);

  useEffect(() => {
    if (pressedLetter) {
      localStorage.setItem(
        storedName,
        JSON.stringify({ position, typedCounter, typoCounter, speedCounter })
      );
    }
  }, [pressedLetter, position]);
};
