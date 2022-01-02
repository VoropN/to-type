import { Dispatch, memo, SetStateAction, MutableRefObject } from 'react';
import styles from './styles.module.scss';
import { Timer } from '../Timer';
import { ITextOptions } from '../LoadFile';

export interface IIndicators {
  position: number;
  length: number;
  shouldStart: boolean;
  textOptions: ITextOptions;
  typoCounter: number;
  typedCounter: number;
  onTimeUpdate: ({ time }: { time: number }) => void;
  pressedLetter: string;
  setShouldStart: Dispatch<SetStateAction<boolean>>;
  currentLetter: string;
  speedCounter: number;
  enteredCounter: number;
  headerRef: MutableRefObject<any>;
}

const Indicators = ({
  headerRef,
  typedCounter,
  currentLetter,
  pressedLetter,
  position,
  length,
  textOptions,
  shouldStart,
  setShouldStart,
  onTimeUpdate,
  typoCounter,
  enteredCounter,
  speedCounter,
}: IIndicators) => {
  return (
    <div ref={headerRef} className={styles.indicators}>
      <div>
        <h4 className={styles.indicator}>Await: {currentLetter}</h4>
        <h4 className={styles.indicator}>Pressed: {pressedLetter}</h4>
      </div>
      <div>
        <h4 className={styles.indicator}>Typed: {typedCounter} </h4>
        <h4 className={styles.indicator}>
          Position: {position}/{length}
        </h4>
      </div>
      <div>
        <h4 className={styles.indicator}>Typo: {typoCounter}</h4>
        <h4 className={styles.typoPercentage}>
          {typoCounter ? ((typoCounter / enteredCounter) * 100).toFixed(2) : 0}%
        </h4>
      </div>
      <Timer
        className={styles.indicator}
        name={textOptions.name}
        shouldStart={shouldStart}
        shouldUpdate={enteredCounter}
        setShouldStart={setShouldStart}
        onUpdate={onTimeUpdate}
      />
      <h4 className={styles.indicator}>Speed: {speedCounter}</h4>
    </div>
  );
};

export default memo(Indicators);
