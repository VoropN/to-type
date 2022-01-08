import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { enterSymbol, getSymbol } from '../helpers';
import { getWord } from '../../../helpers';

interface IUseUpdatedVersion {
  fullText: string;
  position: number;
  activePage: number;
  text: string;
  updatedVersion: number;
  pressedLetter: string;
  setPosition: Dispatch<SetStateAction<number>>;
}

export const useUpdatedVersion = ({
  fullText,
  position,
  activePage,
  text,
  updatedVersion,
  pressedLetter,
  setPosition,
}: IUseUpdatedVersion) => {
  const [typoCounter, setTypoCounter] = useState(0);
  const [typedCounter, setTypedCounter] = useState(0);
  const [isPressedLetterVisible, setIsPressedLetterVisible] = useState(false);
  const [speedCounter, setSpeedCounter] = useState(0);
  const currentPosition = position - activePage * 1000;
  const currentLetter = useMemo(
    () => getSymbol(fullText[position]),
    [fullText, position]
  );
  const word = useMemo(
    () => getWord({ text, position: currentPosition }),
    [text, currentPosition]
  );

  const onTimeUpdate = useCallback(
    ({ time }: { time: number }) => {
      if (typedCounter) {
        const seconds = 1000 * 60;
        setSpeedCounter(Math.round((typedCounter * seconds) / time));
      }
    },
    [typedCounter, setSpeedCounter]
  );
  useEffect(() => {
    if (!updatedVersion) return;
    if (pressedLetter === currentLetter) {
      setIsPressedLetterVisible(false);
      setTypedCounter(typedCounter + 1);
      setPosition(
        pressedLetter === enterSymbol
          ? position + (fullText.slice(position).match(/\S/)?.index || 0)
          : position + 1
      );
    } else {
      setTypoCounter(typoCounter + 1);
      setIsPressedLetterVisible(true);
    }
  }, [updatedVersion]);

  return {
    word,
    typoCounter,
    typedCounter,
    onTimeUpdate,
    speedCounter,
    setTypoCounter,
    setSpeedCounter,
    setTypedCounter,
    currentLetter,
    currentPosition,
    isPressedLetterVisible,
  };
};
