import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekDay from 'dayjs/plugin/weekday';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(weekDay);

const LOCAL_STORAGE_PINNED_DATE_KEY = 'pinnedDate';

const getFormattedDayVerbose = (day: Dayjs): string => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${weekDays[day.weekday()]} ${day.format('DD MMM')}`;
};

const getDurationStringFromMilliseconds = (milliseconds: number): string => {
  const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
  const totalMinutes = Math.floor(
    (milliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );
  return `${totalHours ? `${totalHours}h ` : ''}${
    totalMinutes ? `${totalMinutes}m` : ''
  }`.trim();
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

export {
  getDurationStringFromMilliseconds,
  getFormattedDayVerbose,
  getLocalStoragePinnedDate,
  setLocalStoragePinnedDate,
};
