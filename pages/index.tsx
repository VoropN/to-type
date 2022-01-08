import { FC, useRef } from 'react';
import styles from './Home.module.scss';
import { LoadFile } from '../components/LoadFile';
import { Pagination, usePaginationProps } from '../components/Pagination';
import { useLoadFileProps } from '../components/LoadFile';
import { TextToEnter, useTextToEnterProps } from '../components/TextToEnter';
import { Indicators, useIndicatorsProps } from '../components/Indicators';

export async function getStaticProps(context: any) {
  // @ts-ignore
  const text = (await import('/data/notebooks.txt')).default;
  return {
    props: { data: { text, textOptions: { name: 'medium-patterns' } } },
  };
}

const Home: FC<any> = ({ data }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  const loadFileProps = useLoadFileProps({ data });
  const textToEnterProps = useTextToEnterProps({
    headerRef,
    fullText: loadFileProps.text,
    textOptions: loadFileProps.textOptions,
    isLoading: loadFileProps.isLoading,
  });
  const paginationProps = usePaginationProps({
    activePage: textToEnterProps.activePage,
    pages: textToEnterProps.pages,
  });

  const indicatorsProps = useIndicatorsProps({
    loadFileProps,
    textToEnterProps,
  });

  return (
    <>
      <header className={styles.header} ref={headerRef}>
        <LoadFile {...loadFileProps} />
        <Indicators {...indicatorsProps} />
      </header>
      <div className={styles.root}>
        <TextToEnter {...textToEnterProps} />
        <Pagination {...paginationProps} />
      </div>
    </>
  );
};

export default Home;
