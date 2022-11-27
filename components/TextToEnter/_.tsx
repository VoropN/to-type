import cn from 'classnames';
import { useScrollToPosition } from 'components/TextToEnter/hooks/useScrollToPosition';
import { Dispatch, memo, SetStateAction, useRef } from 'react';
import { IScrollOptions, IScrollToPositionFunc } from 'types/IScrollToPosition';
import { IWordData } from 'utils';
import { visibleSymbols } from './helpers';
import styles from './styles.module.scss';

export interface ITextToEnter {
  text: string;
  word: IWordData;
  activePage: number;
  currentPage: number;
  pressedLetter: string;
  currentLetter: string;
  currentPosition: number;
  isPressedLetterVisible: boolean;
  shouldStart: boolean;
  updatedVersion: number;
  setShouldStart: Dispatch<SetStateAction<boolean>>;
  scrollOptions: IScrollOptions;
  scrollToPosition: IScrollToPositionFunc;
}

const TextToEnter = ({
  text,
  word,
  activePage,
  currentPage,
  shouldStart,
  currentLetter,
  pressedLetter,
  scrollOptions,
  setShouldStart,
  updatedVersion,
  currentPosition,
  scrollToPosition,
  isPressedLetterVisible,
}: ITextToEnter) => {
  const selectedRef = useRef<HTMLSpanElement>(null);

  useScrollToPosition({
    text,
    selectedRef,
    shouldStart,
    pressedLetter,
    scrollOptions,
    setShouldStart,
    updatedVersion,
    scrollToPosition,
  });

  return (
    <div className={styles.text} tabIndex={1}>
      <div className={styles.unStandardSymbol}>↵</div>
      {currentPage === activePage && word ? (
        <>
          <span>{text.slice(0, word.position.start)}</span>
          <div
            className={cn(styles.word, {
              [styles.isSpaceSymbol]: /\s+/.test(text[currentPosition]),
            })}
          >
            {word.text.start}
            <span
              ref={selectedRef}
              className={styles.selected}
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
