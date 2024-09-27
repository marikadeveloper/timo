import { getOngoingTask } from '../data/services/taskService';
import { startTimer } from '../data/services/timerService';

async function useRestartTimer() {
  const ongoingTask = await getOngoingTask();
  const restartTimer = async () => {
    if (ongoingTask) {
      await startTimer(ongoingTask.id);
    }
  };
  return restartTimer;
}

export default useRestartTimer;
