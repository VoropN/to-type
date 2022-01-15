import { memo } from 'react';
import { Indicators } from '../Indicators';
import { LoadFile } from '../LoadFile';
import { ITextToEnter } from 'components/TextToEnter';
import { Timer } from 'components/Timer';
import { EnteredLetterHint } from 'components/Header/EnteredLetterHint';
import styles from './styles.module.scss';
import { ILoadTextFunc, IText } from 'types/ILoadText';

interface IHeader {
  textToEnterProps: ITextToEnter;
  textData: IText;
  loadText: ILoadTextFunc;
}

const Header = ({ loadText, textToEnterProps, textData }: IHeader) => {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <div className={styles.section}>
          <h4 className={styles.textName}>{textData.options.name}</h4>

          <LoadFile loadText={loadText} />
          <Timer
            time={textToEnterProps.time}
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
          textLength={textData.text.length}
          textToEnterProps={textToEnterProps}
        />
      </div>
    </header>
  );
};

export default memo(Header);
