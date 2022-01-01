import { ILoadFile } from "../LoadFile";
import { MutableRefObject } from "react";
import { ITextToEnter } from "../TextToEnter";
import { IIndicators } from "./";

interface IUseIndicatorsProps {
  headerRef: MutableRefObject<any>;
  textToEnterProps: ITextToEnter;
  loadFileProps: ILoadFile;
}
export const useIndicatorsProps = ({
  headerRef,
  textToEnterProps,
  loadFileProps,
}: IUseIndicatorsProps): IIndicators => {
  return {
    headerRef,
    length: loadFileProps.text.length,
    enteredCounter:
      textToEnterProps.typoCounter + textToEnterProps.typedCounter,
    typoCounter: textToEnterProps.typoCounter,
    typedCounter: textToEnterProps.typedCounter,
    currentLetter: textToEnterProps.currentLetter,
    pressedLetter: textToEnterProps.pressedLetter,
    position: textToEnterProps.position,
    textOptions: loadFileProps.textOptions,
    shouldStart: textToEnterProps.shouldStart,
    setShouldStart: textToEnterProps.setShouldStart,
    onTimeUpdate: textToEnterProps.onTimeUpdate,
    speedCounter: textToEnterProps.speedCounter,
  };
};
