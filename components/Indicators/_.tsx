import { memo, ReactNode } from 'react';
import styles from './styles.module.scss';
import { Timer } from '../Timer';
import { ILoadFile } from '../LoadFile';
import { EditableField } from '../EditableField';
import cn from 'classnames';
import { formatTime } from '../Timer/utils/formatTime';
import { useIndicatorsProps } from 'components/Indicators/useIndicatorsProps';
import { ITextToEnter } from 'components/TextToEnter';

interface IIndicators {
  textToEnterProps: ITextToEnter;
  loadFileProps: ILoadFile;
  children: ReactNode;
}

const Indicators = ({
  children,
  loadFileProps,
  textToEnterProps,
}: IIndicators) => {
  const {
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
  } = useIndicatorsProps({
    loadFileProps,
    textToEnterProps,
  });
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
        <h4 className={styles.indicator}>Time: {formatTime({ time })}</h4>
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
          Typed: {typedCounter}/{length}
        </h4>
      </div>
    </div>
  );
};

export default memo(Indicators);
