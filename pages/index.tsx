import { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from './Home.module.scss';
import { getWord } from "../helpers";
import { scrollToElement } from "../helpers";
import { Timer } from "../components/Timer";
import {LoadFile} from "../components/LoadFile";
import classNames from "classnames";
import {Pagination, usePaginationProps} from "../components/Pagination";
import {useLoadFileProps} from "../components/LoadFile";

export async function getStaticProps(context: any) {
  // @ts-ignore
  const text = (await import('/data/notebooks.txt')).default;
  return { props: { data: {text, textOptions: {name: 'medium-patterns'}} } }
}

const space = '_';
const visibleSymbols = ['↵'];
const getSymbol = (letter: string) => {
  if (/\r|\n|Enter/.test(letter)) return '↵';
  if (/\s/.test(letter)) return space;
  if (/[`'’]/.test(letter)) return '\'';
  if (/[-—]/g.test(letter)) return '-';
  if (/[….·]/.test(letter)) return '.';

  return letter;
}

const Home: FC<any> = ({ data }) => {
  const [text, setText] = useState('');
  const selectedRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [clicked, setClicked] = useState('');
  const [typo, setTypo] = useState(0);
  const [speed, setSpeed] = useState(0);

  const loadFileProps = useLoadFileProps({data});
  const paginationProps = usePaginationProps({fullText: loadFileProps.text, setText});

  const currentPosition = position - paginationProps.activePage * 1000;
  const [prevLetter, currentLetter] = useMemo(() => [
    getSymbol(loadFileProps.text[position - 1]),
    getSymbol(loadFileProps.text[position])], [loadFileProps.text, position]);
  const inputtedLetter = getSymbol(clicked);``
  const isInputtedLetterVisible = useMemo(() =>
    inputtedLetter && currentLetter !== inputtedLetter && prevLetter !== inputtedLetter, [prevLetter, inputtedLetter, currentLetter]);
  const word = useMemo(() => getWord({ text, position: currentPosition }), [text, currentPosition]);
  const onTimeUpdate = ({ time }: { time: number }) => {
    if (position) {
      const seconds = 1000 * 60;
      setSpeed(Math.round(position * seconds / time));
    }
  }

  const updateActivePage = ({position}: {position: number;}) => {
    const page = position / 1000 >> 0;
    const state = page * 1000;
    paginationProps.setActivePage(page);
    setText(loadFileProps.text.slice(state, state + 1000));
    scrollToElement({ headerRef, selectedRef, forceScroll: true });
  }
  useEffect(() => {
    if (position / 1000 >> 0 !== paginationProps.activePage) {
      updateActivePage({position});
    }
  }, [clicked, loadFileProps.text]);

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
        if (key === loadFileProps.text[position] || getSymbol(key) === getSymbol(loadFileProps.text[position])) {
          if (key === 'Enter') setPosition(
            position +
            (loadFileProps.text.slice(position).match(/\S/)?.index || 0)
          );
          else setPosition(position + 1);
        } else {
          setTypo(typo + 1);
        }
    }

    scrollToElement({ headerRef, selectedRef, forceScroll: !shouldStart });
  }

  useEffect(() => {
    if (clicked) {
      setShouldStart(true);
      localStorage.setItem(`progress-${loadFileProps.textOptions.name}`, JSON.stringify({position, typo, speed}));
    }
  }, [position, clicked, position, typo, speed, setShouldStart]);

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem(`progress-${loadFileProps.textOptions.name}`) || '{"position": 0, "typo": 0, "speed": 0}');
    setPosition(progress.position);
    setTypo(progress.typo);
    setSpeed(progress.speed);
    setClicked('');
    updateActivePage({position: progress.position});
  }, [loadFileProps.textOptions, loadFileProps.text]);

  useEffect(() => {
    document.addEventListener('keypress', inputFunc, false);
    return () => document.removeEventListener('keypress', inputFunc, false);
  }, [position, shouldStart]);
  const selected = getSymbol(loadFileProps.text[position]);

  return <div className={styles.root}>
    <LoadFile {...loadFileProps}/>
    <div ref={headerRef} className={styles.header}>
      <h4>Await: {currentLetter}</h4>
      <h4>Clicked: {inputtedLetter}</h4>
      <h4>Typed: {position} </h4>
      <Timer name={loadFileProps.textOptions.name} shouldStart={shouldStart} shouldUpdate={clicked} setShouldStart={setShouldStart} onUpdate={onTimeUpdate}/>
      <h4>typo: {typo} / {position ? (typo / position * 100).toFixed(2) : 0}%</h4>
      <h4>Speed: {speed}</h4>
    </div>
    <div className={styles.text}>
      {loadFileProps.isLoading && '...loading'}
      {position / 1000 >> 0 === paginationProps.activePage ? (
        <>
        <span>{text.slice(0, word.position.start)}</span>
        <div className={styles.word}>
          {word.text.start}
          <span
            ref={selectedRef}
            className={classNames(
              styles.selected,
              {[styles.space]: selected === space || visibleSymbols.includes(selected)},
              {[styles.hideCaret]: visibleSymbols.includes(selected)})}
            {...{
              ...(isInputtedLetterVisible && {"data-clicked": clicked}),
              ...(visibleSymbols.includes(selected) && {"data-text": selected})
            }}>
          {text[currentPosition]}
        </span>
          {word.text.end}
        </div>
        <span>{text.slice(word.position.end)}</span>
      </>
      ) : text}
    <Pagination {...paginationProps} />
    </div>
  </div>
    ;
};

export default Home
