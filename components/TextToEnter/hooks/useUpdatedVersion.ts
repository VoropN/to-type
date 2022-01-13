import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { enterSymbol, getSymbol } from '../helpers';
import { getWord } from '../../../helpers';
import { getCurrentPosition } from '../helpers/getCurrentPage';

interface IUseUpdatedVersion {
  fullText: string;
  position: number;
  currentPage: number;
  activePage: number;
  time: number;
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
  time,
  updatedVersion,
  pressedLetter,
  setPosition,
  currentPage,
}: IUseUpdatedVersion) => {
  const [typoCounter, setTypoCounter] = useState(0);
  const [typedCounter, setTypedCounter] = useState(0);
  const [isPressedLetterVisible, setIsPressedLetterVisible] = useState(false);
  const [speedCounter, setSpeedCounter] = useState(0);
  const currentPosition = getCurrentPosition({ position, activePage });
  const currentLetter = useMemo(
    () => getSymbol(fullText[position]),
    [fullText, position]
  );
  const word = useMemo(
    () =>
      activePage === currentPage
        ? getWord({ text, position: currentPosition })
        : null,
    [text, currentPosition]
  );

  useEffect(() => {
    if (typedCounter) {
      const seconds = 1000 * 60;
      setSpeedCounter(Math.round((typedCounter * seconds) / time));
    }
  }, [updatedVersion, time]);

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
    speedCounter,
    setTypoCounter,
    setSpeedCounter,
    setTypedCounter,
    currentLetter,
    currentPosition,
    isPressedLetterVisible,
  };
};
