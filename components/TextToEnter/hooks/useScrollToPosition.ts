import { RefObject, useEffect, useRef, useState } from 'react';
import { scrollToElement } from '../../../helpers';

interface IUseScrollToPosition {
  pressedLetter: string;
  headerRef: RefObject<HTMLElement>;
  updatedVersion: number;
  text: string;
}

export const useScrollToPosition = ({
  pressedLetter,
  headerRef,
  updatedVersion,
  text,
}: IUseScrollToPosition) => {
  const [shouldStart, setShouldStart] = useState(false);
  const selectedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    scrollToElement({ headerRef, selectedRef, forceScroll: shouldStart });
  }, [shouldStart]);

  useEffect(() => {
    scrollToElement({ headerRef, selectedRef });
  }, [updatedVersion, text]);

  useEffect(() => {
    if (pressedLetter) {
      setShouldStart(true);
    }
  }, [pressedLetter]);

  return {
    shouldStart,
    setShouldStart,
    selectedRef,
  };
};
