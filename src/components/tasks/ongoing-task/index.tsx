import { TaskExtended } from '../../../data/interfaces/Task';
import { stopTimer } from '../../../data/services/timerService';
import { getTaskDurationString } from '../../../utils/taskUtils';
import BlinkingDot from '../../shared/blinking-dot';
import Button from '../../shared/button';
import './styles.scss';

type OngoingTaskProps = {
  task: TaskExtended;
};

const OngoingTask: React.FC<OngoingTaskProps> = ({ task }) => {
  const handleStopTimer = () => {
    stopTimer(task.id);
  };
  return (
    <div className='ongoing-task'>
      <h3 className='title--mini'>Ongoing task</h3>
      <p>{task.description}</p>
      <div className='ongoing-task__details'>
        <p>{task.project?.name || 'No project'}</p>
        <div className='ongoing-task__duration'>
          <BlinkingDot color='red' />
          <p>{getTaskDurationString(task.timers)}</p>
        </div>
        <Button onClick={handleStopTimer}>Stop</Button>
      </div>
    </div>
  );
};

export default OngoingTask;
