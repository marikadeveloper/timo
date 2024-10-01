import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import DateNavigation from '../../components/tasks/date-navigation';
import OngoingTask from '../../components/tasks/ongoing-task';
import Task from '../../components/tasks/task';
import TaskCreate from '../../components/tasks/task-create';
import TasksExportButton from '../../components/tasks/tasks-export-button';
import TasksTotalDuration from '../../components/tasks/tasks-total-duration';
import { TaskExtended } from '../../data/interfaces/Task';
import { getOngoingTask } from '../../data/services/taskService';
import { useLiveTasks } from '../../hooks/useLiveTasks';
import { getLocalStoragePinnedDate } from '../../utils/dateUtils';
import './styles.scss';

const today = dayjs();

const Tasks: React.FC = () => {
  const [date, setDate] = useState<dayjs.Dayjs>(
    () => getLocalStoragePinnedDate() || today,
  );
  const { tasks } = useLiveTasks(date);
  const [ongoingTask, setOngoingTask] = useState<TaskExtended | null>(null);

  useEffect(() => {
    const fetchOngoingTask = async () => {
      const task = await getOngoingTask();
      setOngoingTask(task);
    };

    fetchOngoingTask();
  }, [tasks]);

  return (
    <div className='tasks'>
      <section className='tasks__header'>
        <DateNavigation
          dateChanged={setDate}
          defaultDate={date}
        />
        {Boolean(tasks?.length) && (
          <div className='tasks__header__export'>
            {/* TODO: decomment <DatePin date={date} /> */}
            {/* TODO: add a mark to get to today's date */}
            <TasksTotalDuration tasks={tasks} />
            <TasksExportButton tasks={tasks} />
          </div>
        )}
      </section>
      <section className='tasks__list'>
        {!tasks?.length && <p>Start an activity below 🙂 ⏬️</p>}
        {tasks
          ?.filter((t) => t.id !== ongoingTask?.id)
          .map((task) => (
            <Task
              key={task.id}
              task={task}
            />
          ))}
      </section>
      <section className='tasks__footer'>
        {ongoingTask && <OngoingTask task={ongoingTask} />}
        {!ongoingTask && <TaskCreate />}
      </section>
    </div>
  );
};

export default Tasks;
