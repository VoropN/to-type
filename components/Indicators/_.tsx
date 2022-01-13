import { Dispatch, memo, SetStateAction } from 'react';
import styles from './styles.module.scss';
import { Timer } from '../Timer';
import { ITextOptions } from '../LoadFile';
import { EditableField } from '../EditableField';

export interface IIndicators {
  position: number;
  pagesLength: number;
  length: number;
  shouldStart: boolean;
  isPositionEditable: boolean;
  textOptions: ITextOptions;
  typoCounter: number;
  typedCounter: number;
  pressedLetter: string;
  setShouldStart: Dispatch<SetStateAction<boolean>>;
  currentLetter: string;
  speedCounter: number;
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
  onChangePosition: (position: string) => void;
  onValidatePosition: (position: string) => boolean;
  setIsPositionEditable: Dispatch<SetStateAction<boolean>>;
  enteredCounter: number;
  currentPage: number;
}

const Indicators = ({
  typedCounter,
  pagesLength,
  currentLetter,
  pressedLetter,
  position,
  length,
  currentPage,
  textOptions,
  shouldStart,
  setShouldStart,
  time,
  setTime,
  typoCounter,
  enteredCounter,
  speedCounter,
  onChangePosition,
  isPositionEditable,
  onValidatePosition,
  setIsPositionEditable,
}: IIndicators) => {
  const onPositionEdit = () => {
    !isPositionEditable && setIsPositionEditable(true);
  };

  return (
    <div className={styles.indicators}>
      <div>
        <h4 className={styles.indicator}>Await: {currentLetter}</h4>
        <h4 className={styles.indicator}>Pressed: {pressedLetter}</h4>
      </div>
      <div>
        <h4 className={styles.indicator}>Typed: {typedCounter} </h4>
        <h4 className={styles.indicator}>
          {`Typo: ${typoCounter} / ${
            typoCounter ? ((typoCounter / enteredCounter) * 100).toFixed(2) : 0
          }%`}
        </h4>
      </div>
      <div>
        <h4 className={styles.indicator} onClick={onPositionEdit}>
          Position:&nbsp;
          <EditableField
            onValidate={onValidatePosition}
            onChange={onChangePosition}
            onEdit={setIsPositionEditable}
            isEditable={isPositionEditable}
          >
            {position}
          </EditableField>
        </h4>
        <h4 className={styles.indicator}>All: {length}</h4>
      </div>
      <Timer
        className={styles.indicator}
        name={textOptions.name}
        shouldStart={shouldStart}
        shouldUpdate={enteredCounter}
        setShouldStart={setShouldStart}
        time={time}
        setTime={setTime}
      />
      <div>
        <h4 className={styles.indicator}>Speed: {speedCounter}</h4>
        <h4 className={styles.indicator}>
          Page: {currentPage + 1}/{pagesLength}
        </h4>
      </div>
    </div>
  );
};

export default memo(Indicators);
