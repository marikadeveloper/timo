import dayjs, { Dayjs } from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const weekDay = require('dayjs/plugin/weekday');

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(weekDay);

export const getFormattedDay = (day: Dayjs): string => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // @ts-expect-error - weekday() is not defined in the types
  return `${weekDays[day.weekday()]} ${day.format('DD MMM')}`;
};

export const getDurationStringFromMilliseconds = (
  milliseconds: number,
): string => {
  const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
  const totalMinutes = Math.floor(
    (milliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  return `${totalHours ? `${totalHours}h ` : ''}${
    totalMinutes ? `${totalMinutes}m` : ''
  }`.trim();
};
