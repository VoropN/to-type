import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { scrollToElement } from '../../../helpers';

export interface IPage {
  name: string | number;
  onSelect: () => void;
}

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
  const charactersPerPage = 1000;
  const [activePage, setActivePage] = useState(0);

  const pages: IPage[] = useMemo(
    () =>
      Array.from(
        { length: (1 + fullText.length / charactersPerPage) >> 0 },
        (_, i) => {
          const start = i * charactersPerPage;
          const end = start + charactersPerPage;

          return {
            name: i,
            onSelect: () => {
              setText(fullText.slice(start, end));
              setActivePage(i);
            },
          };
        }
      ),
    [fullText]
  );

  const updateActivePage = useCallback(
    ({ position }: { position: number }) => {
      const page = (position / charactersPerPage) >> 0;
      if (activePage !== page || !text) {
        const state = page * charactersPerPage;
        setActivePage(page);
        setText(fullText.slice(state, state + charactersPerPage));
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
    if ((position / charactersPerPage) >> 0 !== activePage) {
      updateActivePage({ position });
    }
  }, [pressedLetter, fullText]);

  return {
    pages,
    activePage,
    updateActivePage,
  };
};
