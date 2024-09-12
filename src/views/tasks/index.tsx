import dayjs from 'dayjs';
import { useState } from 'react';
import DateNavigation from '../../components/date-navigation';
import TasksExportButton from '../../components/tasks-export-button';
import TasksTotalDuration from '../../components/tasks-total-duration';
import { useLiveTasks } from '../../data/hooks/exportHooks';
import { getLocalStoragePinnedDate } from '../../utils';
import './styles.scss';

const today = dayjs();

function Tasks() {
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
    </div>
  );
}

export default Tasks;
