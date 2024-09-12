import React from 'react';
import { Task } from '../../data/interfaces/Task';
import IconButton from '../icon-button';

type TasksExportButtonProps = {
  tasks: Task[];
};

const TasksExportButton: React.FC<TasksExportButtonProps> = ({ tasks }) => {
  const exportTasks = () => {
    // TODO: export given tasks as CSV
  };

  return (
    <IconButton
      iconName='code-download'
      ariaLabel='Download tasks as CSV'
      iconAriaLabel='Arrow pointing down'
      onClick={exportTasks}
    />
  );
};

export default TasksExportButton;
