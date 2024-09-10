import dayjs from 'dayjs';
import { useState } from 'react';
import DateNavigation from '../../components/date-navigation';
import { useLiveTasks } from '../../data/hooks/exportHooks';
import './styles.scss';

const today = dayjs();

function Tasks() {
  const [date, setDate] = useState(today);
  const { tasks } = useLiveTasks(date);

  return (
    <div>
      <h2>Tasks</h2>
      <DateNavigation
        dateChanged={setDate}
        defaultDate={today}
      />
      {/* TODO: add a "pin" button to pin the current date, if you go to a date 
      then close the popup, the date resets and you need to return to the target 
      date by navigating */}
    </div>
  );
}

export default Tasks;
