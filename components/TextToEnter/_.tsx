import { Dispatch, memo, SetStateAction, useRef } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { spaceSymbol, visibleSymbols } from './helpers';
import { IWordData } from 'utils';
import { useScrollToPosition } from 'components/TextToEnter/hooks/useScrollToPosition';
import { IScrollOptions, IScrollToPositionFunc } from 'types/IScrollToPosition';

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
      {currentPage === activePage && word ? (
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
