import React from 'react';
import { TaskExtended } from '../../../data/interfaces/Task';
import { getTaskDurationString } from '../../../utils/taskUtils';
import './styles.scss';

type TaskProps = {
  task: TaskExtended;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className='task'>
      <p>{task.description}</p>
      <p>{getTaskDurationString(task.timers)}</p>
    </div>
  );
};

export default Task;
