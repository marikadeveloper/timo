import { useOngoingTask } from '../context/ongoingTaskContext';
import { stopTimer as stopTimerMutation } from '../data/services/timerService';

function useStopTimer() {
  const { setOngoingTask } = useOngoingTask();
  const stopTimer = async (taskId: number) => {
    await stopTimerMutation(taskId);
    setOngoingTask(null);
  };
  return stopTimer;
}

export default useStopTimer;
