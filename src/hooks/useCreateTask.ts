import { useCallback, useState } from 'react';
import { TaskCreateInput } from '../data/interfaces/Task';
import { createTask as createTaskMutation } from '../data/services/taskService';

function useCreateTask() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  const mutate = useCallback(async (task: TaskCreateInput) => {
    try {
      setError(undefined);
      await createTaskMutation(task);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  return { mutate, success, error };
}

export default useCreateTask;
