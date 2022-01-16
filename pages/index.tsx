import { FC, useCallback, useState } from 'react';
import styles from './Home.module.scss';
import { Pagination } from '../components/Pagination';
import { TextToEnter, useHomePage } from '../components/TextToEnter';
import { Header } from '../components/Header';
import { IText } from 'types/ILoadText';

export async function getStaticProps(context: any) {
  // @ts-ignore
  const text = (await import('/data/notebooks.txt')).default;
  return {
    props: { data: { text, options: { name: 'medium-patterns' } } },
  };
}

const Home: FC<any> = ({ data }: { data: IText }) => {
  const [textData, setTextData] = useState(data);

  const loadText = useCallback(
    (textData: IText) => {
      setTextData(textData);
    },
    [setTextData]
  );
  const {
    timerProps,
    paginationProps,
    indicatorsProps,
    textToEnterProps,
    enteredLetterHintProps,
  } = useHomePage(textData);

  return (
    <>
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
    </>
  );
};

export default Home;
