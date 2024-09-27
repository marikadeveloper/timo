import { stopTimer as stopTimerMutation } from '../data/services/timerService';

function useStopTimer() {
  const stopTimer = async (taskId: number) => {
    await stopTimerMutation(taskId);
  };
  return stopTimer;
}

export default useStopTimer;
