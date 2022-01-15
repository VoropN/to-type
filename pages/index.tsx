import { FC } from 'react';
import styles from './Home.module.scss';
import { useLoadFileProps } from 'components/LoadFile';
import { Pagination } from '../components/Pagination';
import { TextToEnter, useTextToEnterProps } from '../components/TextToEnter';
import { Header } from '../components/Header';

export async function getStaticProps(context: any) {
  // @ts-ignore
  const text = (await import('/data/notebooks.txt')).default;
  return {
    props: { data: { text, textOptions: { name: 'medium-patterns' } } },
  };
}

const Home: FC<any> = ({ data }) => {
  const loadFileProps = useLoadFileProps({ data });
  const textToEnterProps = useTextToEnterProps({
    fullText: loadFileProps.text,
    textOptions: loadFileProps.textOptions,
    isLoading: loadFileProps.isLoading,
  });

  return (
    <>
      <Header
        loadFileProps={loadFileProps}
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
