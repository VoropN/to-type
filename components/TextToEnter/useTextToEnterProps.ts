import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getWord, scrollToElement } from '../../helpers';
import { enterSymbol, getSymbol } from './helpers';
import { ITextOptions } from '../LoadFile';
import { ITextToEnter } from './_';

export interface IUseTextToEnterProps {
  headerRef: MutableRefObject<any>;
  fullText: string;
  textOptions: ITextOptions;
  isLoading: boolean;
}

export const useTextToEnterProps = ({
  headerRef,
  fullText,
  textOptions,
  isLoading,
}: IUseTextToEnterProps): ITextToEnter => {
  const [text, setText] = useState('');
  const [pressedLetter, setPressedLetter] = useState('');
  const [typoCounter, setTypoCounter] = useState(0);
  const [updateVersion, setUpdateVersion] = useState(0);
  const [typedCounter, setTypedCounter] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [isPressedLetterVisible, setIsPressedLetterVisible] = useState(false);
  const [position, setPosition] = useState(0);
  const [speedCounter, setSpeedCounter] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [isPositionEditable, setIsPositionEditable] = useState(false);

  useEffect(() => {
    const newPosition =
      position > fullText.length ? fullText.length - 1 : position;
    setPosition(newPosition);
    updateActivePage({ position: newPosition });
  }, [position]);

  useEffect(() => {});

  const selectedRef = useRef<HTMLSpanElement>(null);

  const currentPosition = position - activePage * 1000;
  const storedName = `progress-${textOptions.name}`;
  const currentLetter = useMemo(
    () => getSymbol(fullText[position]),
    [fullText, position]
  );
  const onChangePosition = (position: string) => {
    setPosition(parseInt(position) || 0);
  };

  const word = useMemo(
    () => getWord({ text, position: currentPosition }),
    [text, currentPosition]
  );

  const updateActivePage = useCallback(
    ({ position }: { position: number }) => {
      const page = (position / 1000) >> 0;
      const state = page * 1000;
      setActivePage(page);
      setText(fullText.slice(state, state + 1000));
      scrollToElement({ headerRef, selectedRef, forceScroll: true });
    },
    [
      setActivePage,
      setText,
      headerRef,
      selectedRef,
      fullText,
      isPositionEditable,
    ]
  );
  const onTimeUpdate = useCallback(
    ({ time }: { time: number }) => {
      if (position) {
        const seconds = 1000 * 60;
        setSpeedCounter(Math.round((position * seconds) / time));
      }
    },
    [position, setSpeedCounter]
  );

  useEffect(() => {
    if ((position / 1000) >> 0 !== activePage) {
      updateActivePage({ position });
    }
  }, [pressedLetter, fullText]);

  useEffect(() => {
    const progress = JSON.parse(
      localStorage.getItem(storedName) ||
        '{"position": 0, "typedCounter": 0, "typoCounter": 0, "speedCounter": 0}'
    );

    setPosition(progress.position);
    setTypoCounter(progress.typoCounter);
    setTypedCounter(progress.typedCounter);
    setSpeedCounter(progress.speedCounter);
    setPressedLetter('');
    updateActivePage({ position: progress.position });
  }, [textOptions, fullText, storedName]);

  useEffect(() => {
    if (pressedLetter) {
      setShouldStart(true);
    }
  }, [pressedLetter]);

  useEffect(() => {
    localStorage.setItem(
      storedName,
      JSON.stringify({ position, typedCounter, typoCounter, speedCounter })
    );
  }, [storedName, position, typedCounter, typoCounter, speedCounter]);

  useEffect(() => {
    if (pressedLetter === currentLetter) {
      setIsPressedLetterVisible(false);
      setTypedCounter(typedCounter + 1);
      setPosition(
        pressedLetter === enterSymbol
          ? position + (fullText.slice(position).match(/\S/)?.index || 0)
          : position + 1
      );
    } else {
      setTypoCounter(typoCounter + 1);
      setIsPressedLetterVisible(true);
    }
  }, [updateVersion]);

  useEffect(() => {
    scrollToElement({ headerRef, selectedRef, forceScroll: !shouldStart });
  }, [updateVersion, shouldStart, headerRef, selectedRef, text]);

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
          setUpdateVersion((version) => version + 1);
        }
      }
    };
    document.addEventListener('keypress', inputFunc, false);
    return () => document.removeEventListener('keypress', inputFunc, false);
  }, [setPressedLetter, setUpdateVersion, isPositionEditable]);

  return {
    text,
    word,
    setText,
    position,
    isLoading,
    activePage,
    typoCounter,
    shouldStart,
    selectedRef,
    speedCounter,
    typedCounter,
    onTimeUpdate,
    setActivePage,
    updateVersion,
    currentLetter,
    pressedLetter,
    setShouldStart,
    onChangePosition,
    currentPosition,
    setIsPositionEditable,
    isPressedLetterVisible,
  };
};
