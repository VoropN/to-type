import { Dispatch, memo, MutableRefObject, SetStateAction } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { space, visibleSymbols } from "./helpers";
import { IWordData } from "../../helpers";

export interface ITextToEnter {
  setActivePage: Dispatch<SetStateAction<number>>;
  onTimeUpdate: ({ time }: { time: number }) => void;
  currentPosition: number;
  activePage: number;
  pressedLetter: string;
  currentLetter: string;
  speedCounter: number;
  isLoading: boolean;
  typoCounter: number;
  typedCounter: number;
  shouldStart: boolean;
  isPressedLetterVisible: boolean;
  text: string;
  position: number;
  setShouldStart: Dispatch<SetStateAction<boolean>>;
  selectedRef: MutableRefObject<any>;
  word: IWordData;
  selected: string;
  setText: Dispatch<SetStateAction<string>>;
}

const TextToEnter = ({
  text,
  word,
  selected,
  position,
  isLoading,
  activePage,
  selectedRef,
  pressedLetter,
  currentPosition,
  isPressedLetterVisible,
}: ITextToEnter) => {
  return (
    <div className={styles.text}>
      {isLoading && "...loading"}
      {(position / 1000) >> 0 === activePage ? (
        <>
          <span>{text.slice(0, word.position.start)}</span>
          <div className={styles.word}>
            {word.text.start}
            <span
              ref={selectedRef}
              className={classNames(
                styles.selected,
                {
                  [styles.space]:
                    selected === space || visibleSymbols.includes(selected),
                },
                { [styles.hideCaret]: visibleSymbols.includes(selected) }
              )}
              {...{
                ...(isPressedLetterVisible && {
                  "data-pressed": pressedLetter,
                }),
                ...(visibleSymbols.includes(selected) && {
                  "data-text": selected,
                }),
              }}
            >
              {text[currentPosition]}
            </span>
            {word.text.end}
          </div>
          <span>{text.slice(word.position.end)}</span>
        </>
      ) : (
        text
      )}
    </div>
  );
};

export default memo(TextToEnter);
