import { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from './Home.module.scss';
import { getWord } from "../helpers/getWord";
import { scrollToElement } from "../helpers";
import { Timer } from "../components/Timer";
import {ILoadedFileData, LoadFile} from "../components/LoadFile";
import classNames from "classnames";
import {Pagination, usePaginationProps} from "../components/Pagination";

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
  const [fullText, setFullText] = useState(data.text);
  const [textOptions, setTextOptions] = useState(data.textOptions);
  const [isLoading, setLoading] = useState(false);
  const selectedRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [clicked, setClicked] = useState('');
  const [errors, setErrors] = useState(0);
  const [speed, setSpeed] = useState(0);

  const paginationProps = usePaginationProps({fullText, setText});

  const currentPosition = position - paginationProps.activePage * 1000;
  const [prevLetter, currentLetter] = useMemo(() => [getSymbol(fullText[position - 1]), getSymbol(fullText[position])], [fullText, position]);
  const inputtedLetter = getSymbol(clicked);
  const isInputtedLetterVisible = useMemo(() =>
    inputtedLetter && currentLetter !== inputtedLetter && prevLetter !== inputtedLetter, [inputtedLetter, currentLetter]);
  const word = useMemo(() => getWord({ text, position: currentPosition }), [text, currentPosition]);
  const onTimeUpdate = ({ time }: { time: number }) => {
    if (position) {
      const seconds = 1000 * 60;
      setSpeed(Math.round(position * seconds / time));
    }
  }

  const updateText = ({content, textOptions} : ILoadedFileData) => {
    setTextOptions(textOptions)
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(content as string, 'text/html');
    const result = htmlDoc.body.textContent?.
      replace(/�|^[`~!@#№$%^&*()_+-=,./?'";:{}\[\]|\\<>0-9]/g, '')
      .replace(/\s+/, '')
      .replace(/\n+|\r+/g, '\n')
      .replace(/\n/g, 'ddddd')
      .replace(/\s+/g, ' ')
      .replace(/ddddd/g, '\n') || '';
    setText(result.slice(0, 1000));
    setFullText(result);
  }

  const updateActivePage = ({position}: {position: number;}) => {
    const page = position / 1000 >> 0;
    const state = page * 1000;
    paginationProps.setActivePage(page);
    setText(fullText.slice(state, state + 1000));
    scrollToElement({ headerRef, selectedRef, forceScroll: true });
  }
  useEffect(() => {
    if (position / 1000 >> 0 !== paginationProps.activePage) {
      updateActivePage({position});
    }
  }, [clicked, fullText]);

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
          if (key === 'Enter') setPosition(position + fullText.slice(position).match(/\S/)?.index);
          else setPosition(position + 1);
        } else {
          setErrors(errors + 1);
        }
    }

    scrollToElement({ headerRef, selectedRef, forceScroll: !shouldStart });
  }

  useEffect(() => {
    if (clicked) {
      setShouldStart(true);
      localStorage.setItem(`progress-${textOptions.name}`, JSON.stringify({position, errors, speed}));
    }
  }, [position, clicked, position, errors, speed, setShouldStart]);

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem(`progress-${textOptions.name}`) || '{"position": 0, "errors": 0, "speed": 0}');
    setPosition(progress.position);
    setErrors(progress.errors);
    setSpeed(progress.speed);
    setClicked('');
    updateActivePage({position: progress.position});
  }, [textOptions, fullText]);

  useEffect(() => {
    document.addEventListener('keypress', inputFunc, false);
    return () => document.removeEventListener('keypress', inputFunc, false);
  }, [position, shouldStart]);
  const selected = getSymbol(fullText[position]);

  return <div className={styles.root}>
    <LoadFile setText={updateText} setLoading={setLoading}/>
    <div ref={headerRef} className={styles.header}>
      <h4>Await: {currentLetter}</h4>
      <h4>Clicked: {inputtedLetter}</h4>
      <h4>Typed: {position} </h4>
      <Timer name={textOptions.name} shouldStart={shouldStart} shouldUpdate={clicked} setShouldStart={setShouldStart} onUpdate={onTimeUpdate}/>
      <h4>Errors: {errors} / {position ? (errors / position * 100).toFixed(2) : 0}%</h4>
      <h4>Speed: {speed}</h4>
    </div>
    <div className={styles.text}>
      {isLoading && '...loading'}
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
