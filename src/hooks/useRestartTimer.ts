import { useOngoingTask } from '../context/ongoingTaskContext';
import { startTimer } from '../data/services/timerService';

function useRestartTimer() {
  const { ongoingTask } = useOngoingTask();
  const restartTimer = async () => {
    if (ongoingTask) {
      await startTimer(ongoingTask.id);
    }
  };
  return restartTimer;
}

export default useRestartTimer;
