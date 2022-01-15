import { RefObject, useState } from 'react';
import { ITextOptions } from '../LoadFile';
import { ITextToEnter } from './_';
import { usePosition } from './hooks/usePosition';
import { useScrollToPosition } from './hooks/useScrollToPosition';
import { useActivePage } from './hooks/useActivePage';
import { useSaveProgress } from './hooks/useSaveProgress';
import { usePressedLetter } from './hooks/usePressedLetter';
import { useUpdatedVersion } from './hooks/useUpdatedVersion';

export interface IUseTextToEnterProps {
  fullText: string;
  textOptions: ITextOptions;
  isLoading: boolean;
}

export const useTextToEnterProps = ({
  fullText,
  textOptions,
  isLoading,
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
    isLoading,
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
    setShouldStart,
    currentPosition,
    onChangePosition,
    onValidatePosition,
    isPositionEditable,
    setIsPositionEditable,
    isPressedLetterVisible,
  };
};
