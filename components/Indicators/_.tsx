import { Dispatch, memo, SetStateAction } from 'react';
import styles from './styles.module.scss';
import { Timer } from '../Timer';
import { ITextOptions } from '../LoadFile';
import { EditableField } from '../EditableField';

export interface IIndicators {
  position: number;
  length: number;
  shouldStart: boolean;
  isPositionEditable: boolean;
  textOptions: ITextOptions;
  typoCounter: number;
  typedCounter: number;
  onTimeUpdate: ({ time }: { time: number }) => void;
  pressedLetter: string;
  setShouldStart: Dispatch<SetStateAction<boolean>>;
  currentLetter: string;
  speedCounter: number;
  onChangePosition: (position: string) => void;
  onValidatePosition: (position: string) => boolean;
  setIsPositionEditable: Dispatch<SetStateAction<boolean>>;
  enteredCounter: number;
}

const Indicators = ({
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
          Position:{' '}
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
        onUpdate={onTimeUpdate}
      />
      <h4 className={styles.indicator}>Speed: {speedCounter}</h4>
    </div>
  );
};

export default memo(Indicators);
