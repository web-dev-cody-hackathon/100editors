type Time = {
  seconds: number;
  minutes: number;
  hours: number;
};
/**
 * converts milliseconds to hours, minutes and seconds
 */
const millisecondsToTime = (milliseconds: number): Time => {
  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

  const totalSeconds = milliseconds / 1_000;

  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
  );
  const seconds = Math.floor(totalSeconds % SECONDS_PER_MINUTE);

  return {
    hours,
    minutes,
    seconds,
  };
};

/**
 * @param timeRemaining milliseconds elapsed
 * @returns time formatted as HH:MM:SS. Units are omitted when there are 0. For example, there will be no hours with 1000 seconds
 */
const formatTimestamp = ({ seconds, minutes, hours }: Time): string => {
  const padZeros = (num: number): string => num.toString().padStart(2, "0");

  return [hours, minutes, seconds].map(padZeros).join(":");
};

/**
 * @param start milliseconds since since midnight, January 1, 1970 (UTC)
 * @param end milliseconds since since midnight, January 1, 1970 (UTC)
 * @returns time formatted as HH:MM:SS. Units are omitted when there are 0. For example, there will be no hours with 1000 seconds
 */
export const createTimeStamp = (start: number, end: number) => {
  return formatTimestamp(millisecondsToTime(end - start));
};
