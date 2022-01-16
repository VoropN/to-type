export const getSpeed = ({
  typedCounter,
  time,
}: {
  typedCounter: number;
  time: number;
}) => {
  const seconds = 1000 * 60;
  return Math.round((typedCounter * seconds) / (time || 1));
};
