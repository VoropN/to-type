import { memo } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

interface IEnteredLetterHint {
  isHintSectionVisible: boolean;
  currentLetter: string;
  pressedLetter: string;
}

const EnteredLetterHint = ({
  isHintSectionVisible,
  currentLetter,
  pressedLetter,
}: IEnteredLetterHint) => {
  return (
    <div
      className={cn(styles.section, {
        [styles.sectionVisible]: isHintSectionVisible,
      })}
    >
      <h4 className={styles.indicator}>Expected: {currentLetter}</h4>
      <h4 className={styles.indicator}>Pressed: {pressedLetter}</h4>
    </div>
  );
};

export default memo(EnteredLetterHint);
