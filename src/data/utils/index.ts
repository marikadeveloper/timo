import dayjs, { Dayjs } from 'dayjs';
import { Task } from '../interfaces/Task';
import Timer from '../interfaces/Timer';

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const weekDay = require('dayjs/plugin/weekday');
dayjs.extend(weekDay);

const PROJECTS_DEFAULT_COLORS = [
  '#393b42',
  '#5e2647',
  '#462b63',
  '#203a5f',
  '#2b555e',
  '#195049',
  '#365c20',
  '#68631e',
  '#604419',
];

const getFormattedDay = (day: Dayjs) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let now = day;
  // @ts-expect-error - weekday() is not defined in the types
  return `${weekDays[now.weekday()]} ${now.format('DD MMM')}`;
};

const getDurationStringFromMilliseconds = (milliseconds: number): string => {
  let totalDurationArr = [];
  let totalSeconds = milliseconds / 1000;
  let totalHours = Math.floor(totalSeconds / (60 * 60)); // How many hours?
  totalSeconds = totalSeconds - totalHours * 60 * 60; // Pull those hours out of totalSeconds
  let totalMinutes = Math.floor(totalSeconds / 60); //With hours out this will retun minutes
  totalSeconds = totalSeconds - totalMinutes * 60; // Again pull out of totalSeconds
  if (totalHours) {
    totalDurationArr.push(`${totalHours}h`);
  }
  if (totalMinutes) {
    totalDurationArr.push(`${totalMinutes}m`);
  }
  if (totalSeconds && !totalMinutes && !totalHours) {
    totalDurationArr.push(`${totalSeconds.toFixed(0)}s`);
  }
  return totalDurationArr.join(' ');
};

const getTimerDurationMillis = (timer: Timer): number => {
  if (timer.start && timer.end) {
    return dayjs(timer.end).diff(dayjs(timer.start));
  } else {
    return 0;
  }
};

const getActivityMillisecondsDuration = (timers: Timer[]): number => {
  if (!timers?.length) return 0;
  return timers.reduce((acc, ts) => acc + getTimerDurationMillis(ts), 0);
};

const getActivityDuration = (
  timers: Timer[],
):
  | {
      durationString: string;
      totalDuration: number;
      totalDurationString: string;
      singleDuration: number;
    }
  | undefined => {
  if (!timers || !timers.length) {
    // should always be true
    return;
  }
  let totalDuration: number = 0;
  let totalDurationString: string = '';
  if (timers.some((ts) => !ts.end)) {
    // return elapsedTime, the activity is still running
    const lastTimeSpan = timers[timers.length - 1];
    // @ts-expect-error - fromNow is not defined in the types
    const elapsedTime = dayjs(lastTimeSpan.start).fromNow();
    let elapsedString = elapsedTime;
    if (timers.length > 1 && timers.filter((ts) => ts.start && ts.end).length) {
      // if there are more than one timers, and some of them already have a start and end
      totalDuration = getActivityMillisecondsDuration(
        timers.filter((ts) => ts.start && ts.end),
      );
      totalDurationString = getDurationStringFromMilliseconds(totalDuration);
      elapsedString = `restarted ${elapsedString}`;
    }
    return {
      durationString: elapsedString,
      totalDuration, // previous timers sum
      totalDurationString,
      singleDuration: 0, // the duration of the single activity, relevant for the sum
    };
  } else {
    // return total duration
    totalDuration = getActivityMillisecondsDuration(timers);
    totalDurationString = getDurationStringFromMilliseconds(totalDuration);
    return {
      durationString: totalDurationString,
      totalDuration,
      totalDurationString,
      singleDuration: totalDuration,
    };
  }
};

const getActivitiesTotalDuration = (tasks: Task[]): string => {
  if (!tasks?.length) {
    return '-';
  }
  let totalDurationString = '';
  let totalDuration = 0;
  tasks.forEach((task) => {
    const activityDuration = getActivityDuration(task.timers);
    totalDuration += activityDuration?.singleDuration || 0;
  });
  totalDurationString = getDurationStringFromMilliseconds(totalDuration);
  // totalDuration is the number of milliseconds passed between the two dates
  return totalDurationString;
};

const isCurrentDaysActivity = ({
  timers,
  currentDay = dayjs(),
}: {
  timers: Timer[];
  currentDay?: Dayjs;
}): boolean => {
  // return true if the activity has a time span that starts today
  return timers?.some((timeSpan) => {
    const start = dayjs(timeSpan.start);
    return start.isSame(currentDay, 'day');
  });
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const isActivityEnded = (task: Task): boolean => {
  return task.timers.every((timeSpan) => timeSpan.end);
};

export {
  getActivitiesTotalDuration,
  getActivityDuration,
  getFormattedDay,
  isActivityEnded,
  isCurrentDaysActivity,
  PROJECTS_DEFAULT_COLORS,
  truncateText,
};
