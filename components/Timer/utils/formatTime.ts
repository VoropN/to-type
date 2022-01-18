export const formatTime = ({ time }: { time: number }) => {
  const seconds = (time / 1000) >> 0;
  const minutes = (seconds / 60) >> 0;
  const hours = (minutes / 60) >> 0;
  let formattedTime = '';

  if (hours) {
    formattedTime += `${hours} h`;
  }

  if (minutes) {
    formattedTime += ` ${minutes % 60} m`;
  }

  formattedTime += ` ${seconds % 60} sec`;

  return formattedTime;
};
