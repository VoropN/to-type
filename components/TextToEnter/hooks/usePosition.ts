import { Dispatch, SetStateAction, useMemo } from 'react';
import { IScrollToPosition } from './useScrollToPosition';

interface IUsePosition {
  textLength: number;
  scrollToPosition: IScrollToPosition;
  setPosition: Dispatch<SetStateAction<number>>;
}

export const usePosition = ({
  textLength,
  scrollToPosition,
  setPosition,
}: IUsePosition) => {
  const maxPosition = useMemo(() => textLength - 1, [textLength]);

  const onChangePosition = (rowPosition: string) => {
    const nextPosition = parseInt(rowPosition);
    setPosition(nextPosition > maxPosition ? maxPosition : nextPosition);
    scrollToPosition({ forceScroll: true });
  };
  const onValidatePosition = (rowPosition: string) =>
    !isNaN(parseInt(rowPosition));

  return {
    onChangePosition,
    onValidatePosition,
  };
};
