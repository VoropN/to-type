import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { getSpeed } from 'utils';
import { IText } from 'types/ILoadText';
import { getIndicatorsDiff } from 'components/Header/utils/getIndicatorsDiff';

interface IUseTemporaryIndicators {
  time: number;
  typoCounter: number;
  typedCounter: number;
  textData: IText;
}

export const useTemporaryIndicators = ({
  time,
  textData,
  typoCounter,
  typedCounter,
}: IUseTemporaryIndicators) => {
  const [showSessionProgress, setShowSessionProgress] = useState(false);
  const [sessionVersion, setSessionVersion] = useState(0);
  const [initialIndicators, setInitialIndicators] = useState({
    time,
    typoCounter,
    typedCounter,
  });
  const onStartSession = useCallback(
    (event: ChangeEvent<HTMLButtonElement | any>) => {
      setSessionVersion((version) => version + 1);
      setShowSessionProgress(true);
      event.target?.blur();
    },
    [setSessionVersion]
  );
  const switchProps = useMemo(
    () => ({
      checked: showSessionProgress,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setShowSessionProgress(event.target.checked);
        event.target.blur();
      },
    }),
    [showSessionProgress]
  );
  const diffIndicators = getIndicatorsDiff(initialIndicators, {
    time,
    typoCounter,
    typedCounter,
  });
  const indicatorsProps = {
    ...(showSessionProgress && {
      speedCounter: getSpeed(diffIndicators),
      enteredCounter: diffIndicators.typedCounter + diffIndicators.typoCounter,
      ...diffIndicators,
    }),
  };

  useEffect(() => {
    setInitialIndicators({
      time,
      typoCounter,
      typedCounter,
    });
  }, [sessionVersion]);

  useEffect(() => {
    setShowSessionProgress(false);
    setSessionVersion(0);
  }, [textData]);

  return {
    switchProps,
    onStartSession,
    isShowSwitcher: sessionVersion > 0,
    indicatorsProps,
  };
};
