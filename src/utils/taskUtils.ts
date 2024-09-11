import dayjs from 'dayjs';
import { Task } from '../data/interfaces/Task';
import Timer from '../data/interfaces/Timer';
import { getDurationStringFromMilliseconds } from './dateUtils';

const getTimerDurationMilliseconds = (timer: Timer): number => {
  return timer.start && timer.end
    ? dayjs(timer.end).diff(dayjs(timer.start))
    : 0;
};

const getTaskTotalDurationMilliseconds = (timers: Timer[]): number => {
  return timers.reduce(
    (acc, timer) => acc + getTimerDurationMilliseconds(timer),
    0,
  );
};

const getTaskDuration = (timers: Timer[]) => {
  if (!timers.length) return undefined;

  const totalDuration = getTaskTotalDurationMilliseconds(timers);
  const totalDurationString = getDurationStringFromMilliseconds(totalDuration);

  if (timers.some((timer) => !timer.end)) {
    const lastTimer = timers[timers.length - 1];
    const elapsedTime = dayjs(lastTimer.start).fromNow();
    const elapsedString =
      timers.length > 1 ? `restarted ${elapsedTime}` : elapsedTime;
    return {
      durationString: elapsedString,
      totalDuration,
      totalDurationString,
      singleDuration: 0,
    };
  }

  return {
    durationString: totalDurationString,
    totalDuration,
    totalDurationString,
    singleDuration: totalDuration,
  };
};

const getTaskDurationString = (timers: Timer[]): string => {
  return timers.length
    ? getDurationStringFromMilliseconds(
        getTaskTotalDurationMilliseconds(timers),
      )
    : '-';
};

const getTasksDurationString = (tasks: Task[]): string => {
  const totalDuration = tasks.reduce(
    (acc, task) => acc + getTaskTotalDurationMilliseconds(task.timers),
    0,
  );
  return getDurationStringFromMilliseconds(totalDuration);
};

const isCurrentDaysActivity = (
  timers: Timer[],
  currentDay = dayjs(),
): boolean => {
  return timers.some((timer) => dayjs(timer.start).isSame(currentDay, 'day'));
};

const hasTaskEnded = (task: Task): boolean => {
  return task.timers.every((timer) => timer.end);
};

export {
  getTaskDuration,
  getTaskDurationString,
  getTasksDurationString,
  hasTaskEnded,
  isCurrentDaysActivity,
};
