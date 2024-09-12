import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import db from '../data/db';
import { Task } from '../data/interfaces/Task';

function useLiveTasks(date: dayjs.Dayjs) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    db.tasks
      .where('createdAt')
      .between(date.startOf('day').toDate(), date.endOf('day').toDate())
      .toArray()
      .then((tasks) => {
        setTasks(tasks);
      });
  }, [date]);

  return { tasks };
}

export { useLiveTasks };
