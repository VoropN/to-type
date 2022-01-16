import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { scrollToElement } from 'utils';
import variables from 'styles/variables.module.scss';
import { IScrollOptions, IScrollToPositionFunc } from 'types/IScrollToPosition';

interface IUseScrollToPosition {
  text: string;
  selectedRef: RefObject<HTMLElement>;
  shouldStart: boolean;
  pressedLetter: string;
  scrollOptions: IScrollOptions;
  setShouldStart: Dispatch<SetStateAction<boolean>>;
  updatedVersion: number;
  scrollToPosition: IScrollToPositionFunc;
}
export type IScrollToPosition = (props: { forceScroll?: boolean }) => void;

export const useScrollToPosition = ({
  text,
  selectedRef,
  shouldStart,
  pressedLetter,
  scrollOptions,
  setShouldStart,
  updatedVersion,
  scrollToPosition,
}: IUseScrollToPosition) => {
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
};
