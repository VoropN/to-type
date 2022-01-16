import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getCurrentPage, getPageText } from '../helpers/getCurrentPage';
import { IScrollToPosition } from './useScrollToPosition';

export type IUpdateActivePage = (props: {
  currentPage: number;
  forceUpdate?: boolean;
}) => void;

export interface IPage {
  name: string | number;
  pageId: number;
  onSelect: () => void;
}

interface IUseActivePage {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  fullText: string;
  isPositionEditable: boolean;
  currentPage: number;
  pressedLetter: string;
  scrollToPosition: IScrollToPosition;
}

export const useActivePage = ({
  setText,
  fullText,
  currentPage,
  pressedLetter,
  scrollToPosition,
  isPositionEditable,
}: IUseActivePage) => {
  const [activePage, setActivePage] = useState(0);
  const pagesLength = useMemo(
    () => 1 + getCurrentPage({ position: fullText.length }),
    [fullText]
  );

  const pages: IPage[] = useMemo(
    () =>
      Array.from({ length: pagesLength }, (_, i) => {
        return {
          pageId: i,
          name: i + 1,
          onSelect: () => {
            setText(getPageText({ page: i, fullText }));
            setActivePage(i);
          },
        };
      }),
    [fullText]
  );

  const updateActivePage = useCallback(
    ({ currentPage, forceUpdate = false }) => {
      if (activePage !== currentPage || forceUpdate) {
        setActivePage(currentPage);
        setText(getPageText({ page: currentPage, fullText }));
        scrollToPosition({ forceScroll: forceUpdate });
      }
    },
    [activePage, fullText, isPositionEditable]
  );

  useEffect(() => {
    updateActivePage({ currentPage, forceUpdate: true });
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== activePage) {
      updateActivePage({ currentPage });
    }
  }, [pressedLetter, fullText]);

  return {
    pages,
    activePage,
    pagesLength,
    updateActivePage,
  };
};
