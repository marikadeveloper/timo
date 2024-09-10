import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekDay from 'dayjs/plugin/weekday';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(weekDay);

export const getFormattedDayVerbose = (day: Dayjs): string => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
