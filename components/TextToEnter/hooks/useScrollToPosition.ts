import { RefObject, useEffect, useRef, useState } from 'react';
import { scrollToElement } from '../../../helpers';

interface IUseScrollToPosition {
  pressedLetter: string;
  headerRef: RefObject<HTMLElement>;
  updatedVersion: number;
  text: string;
}
export type IScrollToPosition = (props: { forceScroll?: boolean }) => void;

export const useScrollToPosition = ({
  pressedLetter,
  headerRef,
  updatedVersion,
  text,
}: IUseScrollToPosition) => {
  const [shouldStart, setShouldStart] = useState(false);
  const selectedRef = useRef<HTMLSpanElement>(null);
  const [scrollOptions, setScrollOptions] = useState({
    counter: 0,
    forceScroll: false,
  });
  const scrollToPosition = ({ forceScroll = false }) => {
    setScrollOptions(({ counter }) => ({ counter: counter + 1, forceScroll }));
  };

  useEffect(() => {
    scrollToElement({
      headerRef,
      selectedRef,
      forceScroll: scrollOptions.forceScroll,
    });
  }, [scrollOptions]);

  useEffect(() => {
    scrollToPosition({ forceScroll: shouldStart });
  }, [shouldStart]);

  useEffect(() => {
    scrollToPosition({ forceScroll: false });
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
    scrollToPosition,
  };
};
