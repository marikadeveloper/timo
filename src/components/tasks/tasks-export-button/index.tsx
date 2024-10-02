import React from 'react';
import { TaskExtended } from '../../../data/interfaces/Task';
import { exportTasks } from '../../../data/services/exportService';
import IconButton from '../../shared/icon-button';

type TasksExportButtonProps = {
  tasks: TaskExtended[];
};

const getDateRangeFromTasks = (tasks: TaskExtended[]): [Date, Date] => {
  const [start, end] = [
    tasks[0].timers[0].start,
    tasks[tasks.length - 1].timers[0].start,
  ];

  return [start, end];
};

const TasksExportButton: React.FC<TasksExportButtonProps> = ({ tasks }) => {
  const handleExportTasks = () => {
    const dateRange: [Date, Date] = getDateRangeFromTasks(tasks);
    exportTasks({ dateRange, tasks });
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
