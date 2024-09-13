import dayjs from 'dayjs';
import React, { useState } from 'react';
import DateNavigation from '../../components/date-navigation';
import Task from '../../components/task';
import TaskCreate from '../../components/task-create';
import TasksExportButton from '../../components/tasks-export-button';
import TasksTotalDuration from '../../components/tasks-total-duration';
import { useLiveTasks } from '../../hooks/useLiveTasks';
import { getLocalStoragePinnedDate } from '../../utils/dateUtils';
import './styles.scss';

const today = dayjs();

const Tasks: React.FC = () => {
  const [date, setDate] = useState<dayjs.Dayjs>(
    () => getLocalStoragePinnedDate() || today,
  );
  const { tasks } = useLiveTasks(date);

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
        {tasks?.map((task) => (
          <Task
            key={task.id}
            task={task}
          />
        ))}
      </section>
      <section className='tasks__footer'>
        <TaskCreate />
      </section>
    </div>
  );
};

export default Tasks;
