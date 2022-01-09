import { useMemo, useState } from 'react';
import { getCurrentPage } from '../helpers/getCurrentPage';
import { IScrollToPosition } from './useScrollToPosition';

interface IUsePosition {
  fullText: string;
  scrollToPosition: IScrollToPosition;
}

export const usePosition = ({ fullText, scrollToPosition }: IUsePosition) => {
  const [position, setPosition] = useState(0);
  const maxPosition = useMemo(() => fullText.length - 1, [fullText]);
  const currentPage = useMemo(() => getCurrentPage({ position }), [position]);

  const onChangePosition = (rowPosition: string) => {
    const nextPosition = parseInt(rowPosition);
    setPosition(nextPosition > maxPosition ? maxPosition : nextPosition);
    scrollToPosition({ forceScroll: true });
  };
  const onValidatePosition = (rowPosition: string) =>
    !isNaN(parseInt(rowPosition));

  return {
    position,
    setPosition,
    currentPage,
    onChangePosition,
    onValidatePosition,
  };
};
