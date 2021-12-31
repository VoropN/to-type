import {MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import {getWord, scrollToElement} from "../../helpers";
import {getSymbol} from "./helpers";
import {ITextOptions} from "../LoadFile";
import {ITextToEnter} from "./_";

export interface IUseTextToEnterProps {
  headerRef: MutableRefObject<any>;
  fullText: string;
  textOptions: ITextOptions;
  isLoading: boolean;
}

export const useTextToEnterProps = ({ headerRef, fullText, textOptions, isLoading }: IUseTextToEnterProps): ITextToEnter => {
  const [text, setText] = useState('');
  const [clicked, setClicked] = useState('');
  const [typo, setTypo] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [position, setPosition] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const selectedRef = useRef<HTMLSpanElement>(null);

  const currentPosition = position - activePage * 1000;
  const [prevLetter, currentLetter] = useMemo(() => [
    getSymbol(fullText[position - 1]),
    getSymbol(fullText[position])], [fullText, position]);
  const inputtedLetter = getSymbol(clicked);``
  const isInputtedLetterVisible = useMemo(() =>
    !!inputtedLetter && currentLetter !== inputtedLetter && prevLetter !== inputtedLetter, [prevLetter, inputtedLetter, currentLetter]);
  const word = useMemo(() => getWord({ text, position: currentPosition }), [text, currentPosition]);

  const updateActivePage = ({position}: {position: number;}) => {
    const page = position / 1000 >> 0;
    const state = page * 1000;
    setActivePage(page);
    setText(fullText.slice(state, state + 1000));
    scrollToElement({ headerRef, selectedRef, forceScroll: true });
  }
  const onTimeUpdate = ({ time }: { time: number }) => {
    if (position) {
      const seconds = 1000 * 60;
      setSpeed(Math.round(position * seconds / time));
    }
  }

  const inputFunc = (event: KeyboardEvent) => {
    const { key } = event;
    event.preventDefault?.();
    switch (key) {
      case "Down":
      case "ArrowDown":
      case "Up":
      case "ArrowUp":
      case "Left":
      case "ArrowLeft":
      case "Right":
      case "ArrowRight":
      case "Esc":
      case "Escape":
        break;
      case "Enter":
      default:
        setClicked(getSymbol(key));
        if (key === fullText[position] || getSymbol(key) === getSymbol(fullText[position])) {
          if (key === 'Enter') setPosition(
            position +
            (fullText.slice(position).match(/\S/)?.index || 0)
          );
          else setPosition(position + 1);
        } else {
          setTypo(typo + 1);
        }
    }

    scrollToElement({ headerRef, selectedRef, forceScroll: !shouldStart });
  }

  useEffect(() => {
    if (position / 1000 >> 0 !== activePage) {
      updateActivePage({position});
    }
  }, [clicked, fullText]);

  useEffect(() => {
    if (clicked) {
      setShouldStart(true);
      localStorage.setItem(`progress-${textOptions.name}`, JSON.stringify({position, typo, speed}));
    }
  }, [position, clicked, position, typo, speed, setShouldStart]);

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem(`progress-${textOptions.name}`) || '{"position": 0, "typo": 0, "speed": 0}');
    setPosition(progress.position);
    setTypo(progress.typo);
    setSpeed(progress.speed);
    setClicked('');
    updateActivePage({position: progress.position});
  }, [textOptions, fullText]);

  useEffect(() => {
    document.addEventListener('keypress', inputFunc, false);
    return () => document.removeEventListener('keypress', inputFunc, false);
  }, [position, shouldStart]);
  const selected = getSymbol(fullText[position]);

  return {
    text,
    isLoading,
    setText,
    activePage,
    setActivePage,
    clicked,
    typo,
    speed,
    onTimeUpdate,
    currentLetter,
    inputtedLetter,
    position,
    shouldStart,
    setShouldStart,
    isInputtedLetterVisible,
    currentPosition,
    selectedRef,
    word,
    selected
  }
}
