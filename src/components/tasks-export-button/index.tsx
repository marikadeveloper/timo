import { Task } from '../../data/interfaces/Task';
import IconButton from '../icon-button';

function TasksExportButton({ tasks }: TasksExportButtonProps) {
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
}

type TasksExportButtonProps = {
  tasks: Task[];
};

export default TasksExportButton;
