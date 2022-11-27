import cn from 'classnames';
import { usePosition } from 'components/TextToEnter/hooks/usePosition';
import { memo } from 'react';
import { IIndicatorProps } from 'types/IHomePage';
import { EditableField } from '../EditableField';
import { formatTime } from '../Timer/utils/formatTime';
import styles from './styles.module.scss';

interface IIndicators extends IIndicatorProps {
  textLength: number;
}

const Indicators = ({
  time,
  position,
  textLength,
  currentPage,
  pagesLength,
  typoCounter,
  setPosition,
  typedCounter,
  speedCounter,
  enteredCounter,
  scrollToPosition,
  isPositionEditable,
  setIsPositionEditable,
}: IIndicators) => {
  const onPositionEdit = () => {
    !isPositionEditable && setIsPositionEditable(true);
  };

  const { onChangePosition, onValidatePosition } = usePosition({
    textLength,
    setPosition,
    scrollToPosition,
  });

  return (
    <div className={styles.section}>
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
        Typed: {typedCounter}/{textLength}
      </h4>
    </div>
  );
};

export default memo(Indicators);
