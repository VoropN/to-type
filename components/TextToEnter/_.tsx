import { Dispatch, memo, MutableRefObject, SetStateAction } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { spaceSymbol, visibleSymbols } from './helpers';
import { IWordData } from '../../helpers';
import { IPage } from './hooks/useActivePage';

export interface ITextToEnter {
  pages: IPage[];
  onTimeUpdate: ({ time }: { time: number }) => void;
  currentPosition: number;
  activePage: number;
  updatedVersion: number;
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
  onChangePosition: (position: string) => void;
  onValidatePosition: (position: string) => boolean;
  setIsPositionEditable: Dispatch<SetStateAction<boolean>>;
  selectedRef: MutableRefObject<any>;
  word: IWordData;
  setText: Dispatch<SetStateAction<string>>;
  isPositionEditable: boolean;
}

const TextToEnter = ({
  text,
  word,
  position,
  isLoading,
  activePage,
  selectedRef,
  pressedLetter,
  currentLetter,
  currentPosition,
  isPressedLetterVisible,
}: ITextToEnter) => {
  return (
    <div className={styles.text} tabIndex={1}>
      {isLoading && '...loading'}
      {(position / 1000) >> 0 === activePage && word ? (
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
                    currentLetter === spaceSymbol ||
                    visibleSymbols.includes(currentLetter),
                },
                { [styles.hideCaret]: visibleSymbols.includes(currentLetter) }
              )}
              {...{
                ...(isPressedLetterVisible && {
                  'data-pressed': pressedLetter,
                }),
                ...(visibleSymbols.includes(currentLetter) && {
                  'data-text': currentLetter,
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
