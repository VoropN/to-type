import { Dispatch, memo, ReactNode, SetStateAction } from 'react';
import styles from './styles.module.scss';
import { Timer } from '../Timer';
import { ITextOptions } from '../LoadFile';
import { EditableField } from '../EditableField';
import cn from 'classnames';

export interface IIndicators {
  position: number;
  pagesLength: number;
  length: number;
  shouldStart: boolean;
  isPositionEditable: boolean;
  isHintSectionVisible: boolean;
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
  children: ReactNode;
}

const Indicators = ({
  children,
  isHintSectionVisible,
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
      <div className={styles.section1}>
        {children}
        <Timer
          name={textOptions.name}
          shouldStart={shouldStart}
          shouldUpdate={enteredCounter}
          setShouldStart={setShouldStart}
          time={time}
          setTime={setTime}
        />
      </div>
      <div
        className={cn(styles.section2, {
          [styles.sectionVisible]: isHintSectionVisible,
        })}
      >
        <h4 className={styles.indicator}>Expected: {currentLetter}</h4>
        <h4 className={styles.indicator}>Pressed: {pressedLetter}</h4>
      </div>
      <div className={styles.section3}>
        <h4 className={cn(styles.indicator, styles.speed)}>
          Speed: {speedCounter}
        </h4>
        <h4 className={styles.indicator}>Time: {(time / 1000).toFixed(0)}</h4>
        <h4 className={styles.indicator}>
          Page: {currentPage + 1}/{pagesLength}
        </h4>
        <h4 className={styles.indicator} onClick={onPositionEdit}>
          Position:
          <EditableField
            onValidate={onValidatePosition}
            onChange={onChangePosition}
            onEdit={setIsPositionEditable}
            isEditable={isPositionEditable}
          >
            {position}
          </EditableField>
        </h4>
        <h4 className={styles.indicator}>
          {`Typo: ${
            typoCounter ? ((typoCounter / enteredCounter) * 100).toFixed(2) : 0
          }%`}
        </h4>
        <h4 className={styles.indicator}>
          Typed: {typedCounter}/{length}{' '}
        </h4>
      </div>
    </div>
  );
};

export default memo(Indicators);
