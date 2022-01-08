import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { scrollToElement } from '../../../helpers';

interface IUseActivePage {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  fullText: string;
  headerRef: RefObject<HTMLElement>;
  selectedRef: RefObject<HTMLElement>;
  isPositionEditable: boolean;
  position: number;
  pressedLetter: string;
}

export const useActivePage = ({
  text,
  setText,
  fullText,
  headerRef,
  selectedRef,
  isPositionEditable,
  position,
  pressedLetter,
}: IUseActivePage) => {
  const [activePage, setActivePage] = useState(0);
  const updateActivePage = useCallback(
    ({ position }: { position: number }) => {
      const page = (position / 1000) >> 0;
      if (activePage !== page || !text) {
        const state = page * 1000;
        setActivePage(page);
        setText(fullText.slice(state, state + 1000));
        scrollToElement({ headerRef, selectedRef, forceScroll: false });
      }
    },
    [
      activePage,
      setActivePage,
      setText,
      headerRef,
      selectedRef,
      fullText,
      isPositionEditable,
    ]
  );

  useEffect(() => {
    updateActivePage({ position });
    selectedRef.current?.focus();
  }, [position, selectedRef]);

  useEffect(() => {
    if ((position / 1000) >> 0 !== activePage) {
      updateActivePage({ position });
    }
  }, [pressedLetter, fullText]);

  return {
    activePage,
    setActivePage,
    updateActivePage,
  };
};
