import { Dispatch, SetStateAction } from 'react';
import { IScrollToPositionFunc } from 'types/IScrollToPosition';

export interface ITimerProps {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  shouldStart: boolean;
  updatedVersion: number;
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
