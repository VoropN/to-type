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
  headerRef: RefObject<HTMLElement>;
  fullText: string;
  textOptions: ITextOptions;
  isLoading: boolean;
}

export const useTextToEnterProps = ({
  headerRef,
  fullText,
  textOptions,
  isLoading,
}: IUseTextToEnterProps): ITextToEnter => {
  const [text, setText] = useState('');

  const {
    pressedLetter,
    updatedVersion,
    isPositionEditable,
    setPressedLetter,
    setIsPositionEditable,
  } = usePressedLetter();

  const { shouldStart, setShouldStart, selectedRef, scrollToPosition } =
    useScrollToPosition({
      headerRef,
      pressedLetter,
      updatedVersion,
      text,
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
    headerRef,
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
    onTimeUpdate,
    speedCounter,
    currentLetter,
    setTypoCounter,
    setSpeedCounter,
    setTypedCounter,
    currentPosition,
    isPressedLetterVisible,
  } = useUpdatedVersion({
    text,
    position,
    fullText,
    activePage,
    currentPage,
    setPosition,
    pressedLetter,
    updatedVersion,
  });

  useSaveProgress({
    textOptions,
    setPosition,
    setTypoCounter,
    setSpeedCounter,
    setPressedLetter,
    updateActivePage,
    updatedVersion,
    setTypedCounter,
    typedCounter,
    typoCounter,
    speedCounter,
    position,
  });

  return {
    text,
    word,
    pages,
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
    onTimeUpdate,
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
