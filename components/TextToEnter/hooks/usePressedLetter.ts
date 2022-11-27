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
        case 'Shift':
        case 'Alt':
        case 'Control':
        case 'CapsLock':
        case 'Meta':
        case 'F12':
        case 'Right':
        case 'ArrowRight':
        case 'Esc':
        case 'Escape':
          break;
        case 'Enter':
        case 'Backspace':
        default: {
          const letter = getSymbol(key);
          setPressedLetter(letter);
          setUpdatedVersion((version) => version + 1);
        }
      }
    };
    document.addEventListener('keydown', inputFunc, false);
    return () => document.removeEventListener('keydown', inputFunc, false);
  }, [setPressedLetter, setUpdatedVersion, isPositionEditable]);
};
