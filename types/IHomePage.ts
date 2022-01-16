import { Dispatch, SetStateAction } from 'react';
import { IScrollToPositionFunc } from 'types/IScrollToPosition';

export interface ITimerProps {
  updatedVersion: number;
  shouldStart: boolean;
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
  setShouldStart: Dispatch<SetStateAction<boolean>>;
}

export interface IIndicatorProps {
  time: number;
  position: number;
  currentPage: number;
  pagesLength: number;
  typoCounter: number;
  setPosition: Dispatch<SetStateAction<number>>;
  typedCounter: number;
  speedCounter: number;
  enteredCounter: number;
  scrollToPosition: IScrollToPositionFunc;
  isPositionEditable: boolean;
  setIsPositionEditable: Dispatch<SetStateAction<boolean>>;
}

export interface IEnteredLetterHintProps {
  currentLetter: string;
  pressedLetter: string;
  isHintSectionVisible: boolean;
}
