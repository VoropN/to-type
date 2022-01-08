import { useEffect, useState } from 'react';
import { getSymbol } from '../helpers';

export const usePressedLetter = () => {
  const [pressedLetter, setPressedLetter] = useState('');
  const [updatedVersion, setUpdatedVersion] = useState(0);
  const [isPositionEditable, setIsPositionEditable] = useState(false);

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

  return {
    pressedLetter,
    setPressedLetter,
    updatedVersion,
    setUpdatedVersion,
    isPositionEditable,
    setIsPositionEditable,
  };
};
