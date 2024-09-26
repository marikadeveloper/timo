import React from 'react';
import { Task as TaskType } from '../../../data/interfaces/Task';
import './styles.scss';

type TaskProps = {
  task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className='task'>
      <p>{task.description}</p>
      <p>TODO</p>
    </div>
  );
};

export default Task;
