import { useState } from 'react';
import { ITextToEnter } from './_';
import { usePosition } from './hooks/usePosition';
import { useScrollToPosition } from './hooks/useScrollToPosition';
import { useActivePage } from './hooks/useActivePage';
import { useSaveProgress } from './hooks/useSaveProgress';
import { usePressedLetter } from './hooks/usePressedLetter';
import { useUpdatedVersion } from './hooks/useUpdatedVersion';
import { IText } from 'types/ILoadText';

export interface IUseTextToEnterProps extends IText {}

export const useTextToEnterProps = ({
  text: fullText,
  options: textOptions,
}: IUseTextToEnterProps): ITextToEnter => {
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);

  const {
    pressedLetter,
    updatedVersion,
    setPressedLetter,
    isPositionEditable,
    setIsPositionEditable,
  } = usePressedLetter();

  const { shouldStart, setShouldStart, selectedRef, scrollToPosition } =
    useScrollToPosition({
      text,
      pressedLetter,
      updatedVersion,
    });

  const {
    position,
    setPosition,
    currentPage,
    onChangePosition,
    onValidatePosition,
  } = usePosition({ fullText, scrollToPosition });

  const { activePage, pages, pagesLength, updateActivePage } = useActivePage({
    text,
    setText,
    fullText,
    selectedRef,
    currentPage,
    pressedLetter,
    scrollToPosition,
    isPositionEditable,
  });

  const {
    word,
    typoCounter,
    typedCounter,
    speedCounter,
    currentLetter,
    setTypoCounter,
    setSpeedCounter,
    setTypedCounter,
    currentPosition,
    isPressedLetterVisible,
  } = useUpdatedVersion({
    text,
    time,
    position,
    fullText,
    activePage,
    currentPage,
    setPosition,
    pressedLetter,
    updatedVersion,
  });

  useSaveProgress({
    time,
    setTime,
    position,
    textOptions,
    setPosition,
    typoCounter,
    typedCounter,
    speedCounter,
    setTypoCounter,
    updatedVersion,
    setSpeedCounter,
    setTypedCounter,
    setPressedLetter,
    updateActivePage,
  });

  return {
    text,
    word,
    time,
    pages,
    setTime,
    setText,
    position,
    activePage,
    currentPage,
    pagesLength,
    typoCounter,
    shouldStart,
    selectedRef,
    speedCounter,
    typedCounter,
    currentLetter,
    pressedLetter,
    updatedVersion,
    enteredCounter: typoCounter + typedCounter,
    setShouldStart,
    currentPosition,
    onChangePosition,
    onValidatePosition,
    isPositionEditable,
    setIsPositionEditable,
    isPressedLetterVisible,
  };
};
