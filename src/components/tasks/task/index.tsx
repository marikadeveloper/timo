import React from 'react';
import { TaskExtended } from '../../../data/interfaces/Task';
import { getTaskDurationString } from '../../../utils/taskUtils';
import Card from '../../shared/card';
import TaskCode from '../task-code';
import './styles.scss';

type TaskProps = {
  task: TaskExtended;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <Card className='task'>
      <TaskCode task={task} />
      <p>{task.description}</p>
      <span className='task__duration'>
        <small>{getTaskDurationString(task.timers)}</small>
      </span>
    </Card>
  );
};

export default Task;
