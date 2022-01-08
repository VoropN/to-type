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

  const { shouldStart, setShouldStart, selectedRef } = useScrollToPosition({
    pressedLetter,
    headerRef,
    updatedVersion,
    text,
  });
  const { position, setPosition, onChangePosition, onValidatePosition } =
    usePosition({ fullText });

  const { activePage, setActivePage, updateActivePage } = useActivePage({
    text,
    setText,
    fullText,
    headerRef,
    selectedRef,
    isPositionEditable,
    position,
    pressedLetter,
  });

  const {
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
  } = useUpdatedVersion({
    fullText,
    position,
    activePage,
    text,
    updatedVersion,
    pressedLetter,
    setPosition,
  });

  useSaveProgress({
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
  });

  return {
    text,
    word,
    setText,
    position,
    isLoading,
    activePage,
    typoCounter,
    shouldStart,
    selectedRef,
    speedCounter,
    typedCounter,
    onTimeUpdate,
    setActivePage,
    updatedVersion,
    currentLetter,
    pressedLetter,
    setShouldStart,
    currentPosition,
    onChangePosition,
    onValidatePosition,
    isPositionEditable,
    setIsPositionEditable,
    isPressedLetterVisible,
  };
};
