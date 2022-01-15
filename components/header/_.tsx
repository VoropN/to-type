import { memo } from 'react';
import styles from './styles.module.scss';

import { Indicators } from '../Indicators';
import { ILoadFile, LoadFile } from '../LoadFile';
import { ITextToEnter } from 'components/TextToEnter';

interface IHeader {
  textToEnterProps: ITextToEnter;
  loadFileProps: ILoadFile;
}

const Header = ({ loadFileProps, textToEnterProps }: IHeader) => {
  return (
    <header className={styles.header}>
      <Indicators
        loadFileProps={loadFileProps}
        textToEnterProps={textToEnterProps}
      >
        <LoadFile {...loadFileProps} />
      </Indicators>
    </header>
  );
};

export default memo(Header);
