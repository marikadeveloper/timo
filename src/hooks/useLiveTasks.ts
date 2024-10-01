import dayjs from 'dayjs';
import { useLiveQuery } from 'dexie-react-hooks';
import { getTasksByDate } from '../data/services/taskService';

function useLiveTasks(date: dayjs.Dayjs) {
  const tasks = useLiveQuery(() => getTasksByDate(date), [date]);

  return { tasks: tasks || [] };
}

export { useLiveTasks };
