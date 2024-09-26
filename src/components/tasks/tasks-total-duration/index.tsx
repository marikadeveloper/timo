import React, { useEffect, useState } from 'react';
import { Task } from '../../../data/interfaces/Task';
import { getTasksDurationString } from '../../../utils/taskUtils';

type TasksTotalDurationProps = {
  tasks: Task[];
};

const TasksTotalDuration: React.FC<TasksTotalDurationProps> = ({ tasks }) => {
  const [totalDuration, setTotalDuration] = useState<string>('');

  useEffect(() => {
    const fetchDuration = async () => {
      const duration = await getTasksDurationString(tasks);
      setTotalDuration(duration);
    };

    fetchDuration();
  }, [tasks]);

  return (
    <div className='total-tasks-duration'>
      <p>TOT: {totalDuration}</p>
    </div>
  );
};

export default TasksTotalDuration;
