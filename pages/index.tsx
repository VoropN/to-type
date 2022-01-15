import { FC, useCallback, useState } from 'react';
import styles from './Home.module.scss';
import { Pagination } from '../components/Pagination';
import { TextToEnter, useTextToEnterProps } from '../components/TextToEnter';
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
  const textToEnterProps = useTextToEnterProps(textData);

  return (
    <>
      <Header
        loadText={loadText}
        textData={textData}
        textToEnterProps={textToEnterProps}
      />
      <div className={styles.root}>
        <TextToEnter {...textToEnterProps} />
        <Pagination
          activePage={textToEnterProps.activePage}
          pages={textToEnterProps.pages}
        />
      </div>
    </>
  );
};

export default Home;
