import dayjs from 'dayjs';
import { useState } from 'react';
import DateNavigation from '../../components/date-navigation';
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
      <h2>Tasks</h2>
      <section className='tasks__navigation'>
        <DateNavigation
          dateChanged={setDate}
          defaultDate={date}
        />
        {/* TODO: decomment <DatePin date={date} /> */}
      </section>

      {/* TODO: add a mark to get to today's date */}
      {/* TODO: add export btton */}
    </div>
  );
}

export default Tasks;
