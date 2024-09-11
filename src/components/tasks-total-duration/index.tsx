import { useMemo } from 'react';
import { Task } from '../../data/interfaces/Task';
import { getTasksDurationString } from '../../utils';

function TasksTotalDuration({ tasks }: TasksTotalDurationProps) {
  const totalDuration = useMemo(() => getTasksDurationString(tasks), [tasks]);

  return (
    <div className='total-tasks-duration'>
      <p>TOT: {totalDuration}</p>
    </div>
  );
}

type TasksTotalDurationProps = {
  tasks: Task[];
};

export default TasksTotalDuration;
