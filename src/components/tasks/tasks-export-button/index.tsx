import React from 'react';
import { Task } from '../../../data/interfaces/Task';
import { exportTasks } from '../../../data/services/exportService';
import IconButton from '../../shared/icon-button';

type TasksExportButtonProps = {
  tasks: Task[];
};

const TasksExportButton: React.FC<TasksExportButtonProps> = ({ tasks }) => {
  const handleExportTasks = () => {
    // TODO: export given tasks as CSV
    exportTasks({ exportType: 'day', tasks });
  };

  return (
    <IconButton
      iconName='code-download'
      ariaLabel='Download tasks as CSV'
      iconAriaLabel='Arrow pointing down'
      onClick={handleExportTasks}
    />
  );
};

export default TasksExportButton;
