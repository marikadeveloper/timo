import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekDay from 'dayjs/plugin/weekday';
import { DateRangeValue } from '../components/shared/date-range-picker';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(weekDay);

const LOCAL_STORAGE_PINNED_DATE_KEY = 'pinnedDate';
const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
const VERBOSE_DATE_FORMAT = 'dd MMM';

const getWeekdayString = (day: Dayjs): string => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekDays[day.weekday()];
};

const getFormattedDayVerbose = (day: Dayjs): string => {
  return `${getWeekdayString(day)} ${day.format(VERBOSE_DATE_FORMAT)}`;
};

const getDurationStringFromMilliseconds = (milliseconds: number): string => {
  const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
  const totalMinutes = Math.floor(
    (milliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  const totalSeconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  if (!totalHours && !totalMinutes && !totalSeconds) return '';

  if (!totalHours && !totalMinutes && totalSeconds) {
    return `${totalSeconds}s`;
  }

  return `${totalHours ? `${totalHours}h ` : ''}${
    totalMinutes ? `${totalMinutes}m` : ''
  }`.trim();

  /** copilot refactor:
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  const seconds = totalSeconds % 60;
  const minutes = totalMinutes % 60;
  const hours = totalHours;

  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);

  return parts.join(' ') || '';
   */
};

const setLocalStoragePinnedDate = (date: Dayjs | null): void => {
  if (!date) {
    localStorage.removeItem(LOCAL_STORAGE_PINNED_DATE_KEY);
    return;
  }
  localStorage.setItem(LOCAL_STORAGE_PINNED_DATE_KEY, date.format());
};

const getLocalStoragePinnedDate = (): Dayjs | null => {
  const pinnedDate = localStorage.getItem(LOCAL_STORAGE_PINNED_DATE_KEY);
  return pinnedDate ? dayjs(pinnedDate) : null;
};

const getDateRangeValueAsArray = (
  dateRange: DateRangeValue,
): null | [Date, Date] => {
  if (!dateRange) return null;

  // 1. dateRange is a date
  if (!Array.isArray(dateRange)) {
    return [dateRange, dateRange];
  }

  // 2. dateRange is an array
  const [start, end] = dateRange;
  if (!start || !end) return null;

  if (start && !end) return [start, start];
  if (!start && end) return [end, end];

  return [start, end];
};

export {
  DEFAULT_DATE_FORMAT,
  getDateRangeValueAsArray,
  getDurationStringFromMilliseconds,
  getFormattedDayVerbose,
  getLocalStoragePinnedDate,
  getWeekdayString,
  setLocalStoragePinnedDate,
  VERBOSE_DATE_FORMAT,
};
