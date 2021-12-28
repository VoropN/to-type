import { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from '../styles/Home.module.scss';
import classNames from "classnames";
import { getWord } from "../helpers/getWord";
import { scrollToElement } from "../helpers";
import { Timer } from "../components/Timer";

export async function getStaticProps(context: any) {
  // @ts-ignore
  const data = (await import('/data/notebooks.txt')).default;
  return { props: { text: data } }
}

const spaceSymbols = ['↵'];
const getSymbol = (letter: string) => {
  if (/\r|\n|Enter/.test(letter)) return '↵';
  if (/\s/.test(letter)) return '˽';
  if (/`|'|’/.test(letter)) return '\'';
  if (/[-—]/g.test(letter)) return '-';
  if (/[….·]/.test(letter)) return '.';

  return letter;
}

const Home: FC<any> = ({ text }) => {
  const selectedRef = useRef<HTMLSpanElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [clicked, setClicked] = useState('');
  const [errors, setErrors] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [prevLetter, currentLetter] = useMemo(() => [getSymbol(text[position - 1]), getSymbol(text[position])], [text, position]);
  const inputtedLetter = getSymbol(clicked);
  const isInputtedLetterVisible = useMemo(() =>
    inputtedLetter && currentLetter !== inputtedLetter && prevLetter !== inputtedLetter, [inputtedLetter, currentLetter]);
  const word = useMemo(() => getWord({ text, position }), [text, position]);
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
        if (key === text[position] || getSymbol(key) === getSymbol(text[position])) {
          if (key === 'Enter') setPosition(position + text.slice(position).match(/\S/)?.index);
          else setPosition(position + 1);
        } else {
          setErrors(errors + 1);
        }
    }

    scrollToElement({ headerRef, selectedRef, forceScroll: !shouldStart });
  }

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('progress') || '{"position": 3940, "errors": 0, "speed": 0}');
    setPosition(progress.position);
    setErrors(progress.errors);
    setSpeed(progress.speed);
  }, []);

  useEffect(() => {
    if (clicked) {
      setShouldStart(true);
      localStorage.setItem('progress', JSON.stringify({position, errors, speed}));
    }
  }, [position, clicked, position, errors, speed, setShouldStart]);

  useEffect(() => {
    document.addEventListener('keypress', inputFunc, false);
    return () => document.removeEventListener('keypress', inputFunc, false);
  }, [position, shouldStart]);
  const selected = getSymbol(text[position]);

  return <div className={styles.root}>
    <div ref={headerRef} className={styles.header}>
      <h4>Await: {currentLetter}</h4>
      <h4>Clicked: {inputtedLetter}</h4>
      <h4>Typed: {position} </h4>
      <Timer shouldStart={shouldStart} shouldUpdate={clicked} setShouldStart={setShouldStart} onUpdate={onTimeUpdate}/>
      <h4>Errors: {errors} / {position ? (errors / position * 100).toFixed(2) : 0} %</h4>
      <h4>Speed: {speed}</h4>
    </div>
    <div className={styles.text}>
      <span className={styles.line}>{text.slice(0, word.position.start)}</span>
      <div className={classNames(styles.word, { [styles.inline]: /\s/.test(text[position]) })}>
        {word.text.start}
        <span ref={selectedRef} data-clicked={isInputtedLetterVisible ? clicked : ''}
              data-text={spaceSymbols.includes(selected) ? selected : ''}
              className={classNames(styles.selected, { [styles.transparent]: spaceSymbols.includes(selected) })}>
        {text[position]}
      </span>
        {word.text.end}
      </div>
      <span className={styles.line}>{text.slice(word.position.end)}</span>
    </div>
  </div>
    ;
};

export default Home