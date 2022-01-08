import { useMemo, useState } from 'react';

interface IUsePosition {
  fullText: string;
}

export const usePosition = ({ fullText }: IUsePosition) => {
  const [position, setPosition] = useState(0);
  const maxPosition = useMemo(() => fullText.length - 1, [fullText]);

  const onChangePosition = (rowPosition: string) => {
    const nextPosition = parseInt(rowPosition);
    setPosition(nextPosition > maxPosition ? maxPosition : nextPosition);
  };
  const onValidatePosition = (rowPosition: string) =>
    !isNaN(parseInt(rowPosition));

  return {
    position,
    setPosition,
    onChangePosition,
    onValidatePosition,
  };
};
