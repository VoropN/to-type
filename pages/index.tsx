import { FC, useRef } from "react";
import styles from './Home.module.scss';
import { Timer } from "../components/Timer";
import {LoadFile} from "../components/LoadFile";
import {Pagination, usePaginationProps} from "../components/Pagination";
import {useLoadFileProps} from "../components/LoadFile";
import {TextToEnter, useTextToEnterProps} from "../components/TextToEnter";

export async function getStaticProps(context: any) {
  // @ts-ignore
  const text = (await import('/data/notebooks.txt')).default;
  return { props: { data: {text, textOptions: {name: 'medium-patterns'}} } }
}

const Home: FC<any> = ({ data }) => {
  const headerRef = useRef<HTMLDivElement>(null);

  const loadFileProps = useLoadFileProps({data});
  const textToEnterProps = useTextToEnterProps({
    headerRef,
    fullText: loadFileProps.text,
    textOptions: loadFileProps.textOptions,
    isLoading: loadFileProps.isLoading });
  const paginationProps = usePaginationProps({
    fullText: loadFileProps.text,
    setText: textToEnterProps.setText,
    activePage: textToEnterProps.activePage,
    setActivePage: textToEnterProps.setActivePage });


  return <div className={styles.root}>
    <LoadFile {...loadFileProps}/>
    <div ref={headerRef} className={styles.header}>
      <h4>Await: {textToEnterProps.currentLetter}</h4>
      <h4>Clicked: {textToEnterProps.inputtedLetter}</h4>
      <h4>Typed: {textToEnterProps.position} </h4>
      <Timer
        name={loadFileProps.textOptions.name}
        shouldStart={textToEnterProps.shouldStart}
        shouldUpdate={textToEnterProps.clicked}
        setShouldStart={textToEnterProps.setShouldStart}
        onUpdate={textToEnterProps.onTimeUpdate}/>
      <h4>
        typo: {textToEnterProps.typo} / {textToEnterProps.position ? (textToEnterProps.typo / textToEnterProps.position * 100).toFixed(2) : 0}%
      </h4>
      <h4>Speed: {textToEnterProps.speed}</h4>
    </div>
    <TextToEnter {...textToEnterProps}/>
    <Pagination {...paginationProps} />
  </div>
    ;
};

export default Home
