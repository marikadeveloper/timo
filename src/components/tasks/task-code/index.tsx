import React from 'react';
import { TaskExtended } from '../../../data/interfaces/Task';
import './styles.scss';

type TaskCodeProps = {
  task: TaskExtended;
};

const TaskCode: React.FC<TaskCodeProps> = ({ task }) => {
  return (
    <p
      className='task-code'
      style={{
        backgroundColor: task.project?.color,
      }}>
      {task.code}
    </p>
  );
};

export default TaskCode;
