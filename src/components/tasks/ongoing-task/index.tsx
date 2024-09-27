import { TaskExtended } from '../../../data/interfaces/Task';
import { getTaskDurationString } from '../../../utils/taskUtils';
import Button from '../../shared/button';
import './styles.scss';

type OngoingTaskProps = {
  task: TaskExtended;
};

const OngoingTask: React.FC<OngoingTaskProps> = ({ task }) => {
  return (
    <div className='ongoing-task'>
      <h3 className='title--mini'>Ongoing task</h3>
      <p>{task.description}</p>
      <div>
        <p>{task.project?.name || 'No project'}</p>
        <p className='ongoing-task__duration'>
          {getTaskDurationString(task.timers)}
        </p>
        <Button>Stop</Button>
      </div>
    </div>
  );
};

export default OngoingTask;
