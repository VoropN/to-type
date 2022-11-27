import { Page } from 'components/Page';
import { FC, useCallback, useState } from 'react';
import { IText } from 'types/ILoadText';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { TextToEnter, useHomePage } from '../components/TextToEnter';
import styles from './Home.module.scss';

export async function getStaticProps(context: any) {
  // @ts-ignore
  const text = (await import('../data/notebooks.txt')).default;
  return {
    props: { data: { text, options: { name: 'The HTML DOM API' } } },
  };
}

const Home: FC<any> = ({ data }: { data: IText }) => {
  const [textData, setTextData] = useState(data);

  const loadText = useCallback(
    (textData: IText) => {
      setTextData(textData);
    },
    [setTextData],
  );
  const {
    timerProps,
    paginationProps,
    indicatorsProps,
    textToEnterProps,
    enteredLetterHintProps,
  } = useHomePage(textData);

  return (
    <Page>
      <Header
        loadText={loadText}
        textData={textData}
        timerProps={timerProps}
        indicatorsProps={indicatorsProps}
        enteredLetterHintProps={enteredLetterHintProps}
      />
      <div className={styles.root}>
        <TextToEnter {...textToEnterProps} />
        <Pagination {...paginationProps} />
      </div>
    </Page>
  );
};

export default Home;
