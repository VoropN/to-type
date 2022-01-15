import { useEffect, useRef, useState } from 'react';
import { scrollToElement } from 'utils';
import variables from 'styles/variables.module.scss';

interface IUseScrollToPosition {
  pressedLetter: string;
  updatedVersion: number;
  text: string;
}
export type IScrollToPosition = (props: { forceScroll?: boolean }) => void;

export const useScrollToPosition = ({
  pressedLetter,
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
      offsetTop: parseInt(variables.headerHeight),
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
  }, [updatedVersion]);

  return {
    shouldStart,
    setShouldStart,
    selectedRef,
    scrollToPosition,
  };
};
