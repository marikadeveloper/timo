import React from 'react';
import { TaskExtended } from '../../../data/interfaces/Task';
import { getTaskDurationString } from '../../../utils/taskUtils';
import Card from '../../shared/card';
import './styles.scss';

type TaskProps = {
  task: TaskExtended;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <Card className='task'>
      <p>{task.code}</p>
      <p>{task.description}</p>
      <p>{getTaskDurationString(task.timers)}</p>
      {/* <IconButton
        iconName='stop-circle'
        ariaLabel='Stop task'
        iconAriaLabel='Stop icon'
        onClick={() => console.log('Stop task')}
      /> */}
    </Card>
  );
};

export default Task;
