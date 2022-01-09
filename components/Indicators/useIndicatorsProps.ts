import { ILoadFile } from '../LoadFile';
import { ITextToEnter } from '../TextToEnter';
import { IIndicators } from './';

interface IUseIndicatorsProps {
  textToEnterProps: ITextToEnter;
  loadFileProps: ILoadFile;
}
export const useIndicatorsProps = ({
  textToEnterProps,
  loadFileProps,
}: IUseIndicatorsProps): IIndicators => {
  return {
    length: loadFileProps.text.length,
    enteredCounter:
      textToEnterProps.typoCounter + textToEnterProps.typedCounter,
    typoCounter: textToEnterProps.typoCounter,
    onValidatePosition: textToEnterProps.onValidatePosition,
    onChangePosition: textToEnterProps.onChangePosition,
    isPositionEditable: textToEnterProps.isPositionEditable,
    setIsPositionEditable: textToEnterProps.setIsPositionEditable,
    typedCounter: textToEnterProps.typedCounter,
    currentLetter: textToEnterProps.currentLetter,
    pressedLetter: textToEnterProps.pressedLetter,
    position: textToEnterProps.position,
    textOptions: loadFileProps.textOptions,
    shouldStart: textToEnterProps.shouldStart,
    setShouldStart: textToEnterProps.setShouldStart,
    onTimeUpdate: textToEnterProps.onTimeUpdate,
    speedCounter: textToEnterProps.speedCounter,
    currentPage: textToEnterProps.currentPage,
  };
};
