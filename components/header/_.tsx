import { memo } from 'react';
import { Indicators } from '../Indicators';
import { ILoadFile, LoadFile } from '../LoadFile';
import { ITextToEnter } from 'components/TextToEnter';
import { Timer } from 'components/Timer';
import { EnteredLetterHint } from 'components/header/EnteredLetterHint';
import styles from './styles.module.scss';

interface IHeader {
  textToEnterProps: ITextToEnter;
  loadFileProps: ILoadFile;
}

const Header = ({ loadFileProps, textToEnterProps }: IHeader) => {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <div className={styles.section}>
          <LoadFile {...loadFileProps} />
          <Timer
            time={textToEnterProps.time}
            name={loadFileProps.textOptions.name}
            setTime={textToEnterProps.setTime}
            shouldStart={textToEnterProps.shouldStart}
            shouldUpdate={textToEnterProps.updatedVersion}
            setShouldStart={textToEnterProps.setShouldStart}
          />
        </div>
        <EnteredLetterHint
          currentLetter={textToEnterProps.currentLetter}
          pressedLetter={textToEnterProps.pressedLetter}
          isHintSectionVisible={!textToEnterProps.shouldStart}
        />
        <Indicators
          loadFileProps={loadFileProps}
          textToEnterProps={textToEnterProps}
        />
      </div>
    </header>
  );
};

export default memo(Header);
