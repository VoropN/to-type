import { Dispatch, SetStateAction, useEffect } from 'react';
import { getSymbol } from '../helpers';

interface IUsePressedLetter {
  setPressedLetter: Dispatch<SetStateAction<string>>;
  setUpdatedVersion: Dispatch<SetStateAction<number>>;
  isPositionEditable: boolean;
}

export const usePressedLetter = ({
  setPressedLetter,
  setUpdatedVersion,
  isPositionEditable,
}: IUsePressedLetter) => {
  useEffect(() => {
    const inputFunc = (event: KeyboardEvent) => {
      if (isPositionEditable) return;
      const { key } = event;
      event.preventDefault?.();
      switch (key) {
        case 'Down':
        case 'ArrowDown':
        case 'Up':
        case 'ArrowUp':
        case 'Left':
        case 'ArrowLeft':
        case 'Right':
        case 'ArrowRight':
        case 'Esc':
        case 'Escape':
          break;
        case 'Enter':
        default: {
          const letter = getSymbol(key);
          setPressedLetter(letter);
          setUpdatedVersion((version) => version + 1);
        }
      }
    };
    document.addEventListener('keypress', inputFunc, false);
    return () => document.removeEventListener('keypress', inputFunc, false);
  }, [setPressedLetter, setUpdatedVersion, isPositionEditable]);
};
