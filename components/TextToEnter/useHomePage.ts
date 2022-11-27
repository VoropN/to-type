import { getCurrentPage } from 'components/TextToEnter/helpers/getCurrentPage';
import { useMemo, useState } from 'react';
import { IText } from 'types/ILoadText';
import { useActivePage } from './hooks/useActivePage';
import { usePressedLetter } from './hooks/usePressedLetter';
import { useSaveProgress } from './hooks/useSaveProgress';
import { useUpdatedVersion } from './hooks/useUpdatedVersion';

export interface IUseTextToEnterProps extends IText {}

export const useHomePage = ({
  text: fullText,
  options: textOptions,
}: IUseTextToEnterProps) => {
  const [text, setText] = useState('');
  const [time, setTime] = useState(0);
  const [pressedLetter, setPressedLetter] = useState('');
  const [updatedVersion, setUpdatedVersion] = useState(0);
  const [isPositionEditable, setIsPositionEditable] = useState(false);
  const [shouldStart, setShouldStart] = useState(false);
  const [position, setPosition] = useState(0);
  const [scrollOptions, setScrollOptions] = useState({
    counter: 0,
    forceScroll: false,
  });
  const currentPage = useMemo(() => getCurrentPage({ position }), [position]);

  usePressedLetter({
    setPressedLetter,
    setUpdatedVersion,
    isPositionEditable,
  });

  const scrollToPosition = ({ forceScroll = false }) => {
    setScrollOptions(({ counter }) => ({ counter: counter + 1, forceScroll }));
  };

  const { activePage, pages, pagesLength, updateActivePage } = useActivePage({
    text,
    setText,
    fullText,
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

  const textToEnterProps = {
    text,
    word,
    activePage,
    currentPage,
    shouldStart,
    currentLetter,
    pressedLetter,
    scrollOptions,
    setShouldStart,
    updatedVersion,
    currentPosition,
    scrollToPosition,
    isPressedLetterVisible,
  };

  const timerProps = {
    time,
    setTime,
    shouldStart,
    updatedVersion,
    setShouldStart,
  };

  const paginationProps = {
    pages,
    activePage,
  };

  const indicatorsProps = {
    time,
    position,
    currentPage,
    pagesLength,
    typoCounter,
    setPosition,
    typedCounter,
    speedCounter,
    enteredCounter: typoCounter + typedCounter,
    scrollToPosition,
    isPositionEditable,
    setIsPositionEditable,
  };

  const enteredLetterHintProps = {
    currentLetter,
    isHintSectionVisible: !shouldStart,
  };

  return {
    timerProps,
    paginationProps,
    indicatorsProps,
    textToEnterProps,
    enteredLetterHintProps,
  };
};
