import React, { useMemo } from 'react';
import { Task } from '../../data/interfaces/Task';
import { getTasksDurationString } from '../../utils/taskUtils';

type TasksTotalDurationProps = {
  tasks: Task[];
};

const TasksTotalDuration: React.FC<TasksTotalDurationProps> = ({ tasks }) => {
  const totalDuration = useMemo(() => getTasksDurationString(tasks), [tasks]);

  return (
    <div className='total-tasks-duration'>
      <p>TOT: {totalDuration}</p>
    </div>
  );
};

export default TasksTotalDuration;
