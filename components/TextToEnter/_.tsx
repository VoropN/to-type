import {memo, MutableRefObject} from "react";
import classNames from "classnames";
import styles from './styles.module.scss';
import {space, visibleSymbols} from "./helpers";
import {IWordData} from "../../helpers";

export interface ITextToEnter {
  setActivePage: (value: (((prevState: number) => number) | number)) => void;
  onTimeUpdate: ({time}: { time: number }) => void;
  currentPosition:number;
  activePage: number;
  inputtedLetter: string;
  clicked: string;
  currentLetter: string;
  speed: number;
  isLoading: boolean;
  typo: number;
  shouldStart: boolean;
  isInputtedLetterVisible: boolean;
  text: string;
  position: number;
  setShouldStart: (value: (((prevState: boolean) => boolean) | boolean)) => void;
  selectedRef: MutableRefObject<any>;
  word: IWordData;
  selected: string;
  setText: (value: (((prevState: string) => string) | string)) => void
}

const TextToEnter = ({
                       text,
                       word,
                       clicked,
                       selected,
                       position,
                       isLoading,
                       activePage,
                       selectedRef,
                       currentPosition,
                       isInputtedLetterVisible
}: ITextToEnter) => {

  return (
    <div className={styles.text}>
      {isLoading && '...loading'}
      {position / 1000 >> 0 === activePage ? (
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
    </div>
  )
};

export default memo(TextToEnter);
