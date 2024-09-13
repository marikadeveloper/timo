import dayjs from 'dayjs';
import { Task } from '../data/interfaces/Task';
import { Timer } from '../data/interfaces/Timer';
import {
  getLatestTimerByTaskId,
  getTimersByTaskId,
} from '../data/services/timerService';
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

const getTasksDurationString = async (tasks: Task[]): Promise<string> => {
  const totalDuration = (
    await Promise.all(
      tasks.map(async (task) => {
        const timers = await getTimersByTaskId(task.id);
        return getTaskTotalDurationMilliseconds(timers);
      }),
    )
  ).reduce((acc, duration) => acc + duration, 0);

  return getDurationStringFromMilliseconds(totalDuration);
};

const isCurrentDaysActivity = (
  timers: Timer[],
  currentDay = dayjs(),
): boolean => {
  return timers.some((timer) => dayjs(timer.start).isSame(currentDay, 'day'));
};

const hasTaskEnded = async (taskId: number): Promise<boolean> => {
  const lastTaskTimer = await getLatestTimerByTaskId(taskId);

  return !!lastTaskTimer?.end;
};

export {
  getTaskDuration,
  getTaskDurationString,
  getTasksDurationString,
  hasTaskEnded,
  isCurrentDaysActivity,
};
