import { memo } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { IEnteredLetterHintProps } from 'types/IHomePage';

const EnteredLetterHint = ({
  currentLetter,
  isHintSectionVisible,
}: IEnteredLetterHintProps) => {
  return (
    <div
      className={cn(styles.section, {
        [styles.sectionVisible]: isHintSectionVisible,
      })}
    >
      <h4 className={styles.indicator}>
        Expected:<span className={styles.content}> {currentLetter}</span>
      </h4>
    </div>
  );
};

export default memo(EnteredLetterHint);
