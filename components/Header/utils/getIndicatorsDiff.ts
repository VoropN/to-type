interface IIndicators {
  time: number;
  typoCounter: number;
  typedCounter: number;
}

export const getIndicatorsDiff = (
  initial: IIndicators,
  current: IIndicators
) => {
  return Object.entries(initial).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: current[key as keyof IIndicators] - value,
    }),
    {}
  ) as IIndicators;
};
