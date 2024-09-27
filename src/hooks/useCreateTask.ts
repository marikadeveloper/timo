// import { useOngoingTask } from '../context/ongoingTaskContext';
// import { TaskCreateInput } from '../data/interfaces/Task';
// import { createTask as createTaskMutation } from '../data/services/taskService';

// function useCreateTask() {
//   const { setOngoingTask } = useOngoingTask();
//   const createTask = async (task: TaskCreateInput) => {
//     const newTask = await createTaskMutation(task);
//     setOngoingTask(newTask);
//   };
//   return createTask;
// }

// export default useCreateTask;
import { useCallback, useState } from 'react';
import { useOngoingTask } from '../context/ongoingTaskContext';
import { TaskCreateInput } from '../data/interfaces/Task';
import { createTask as createTaskMutation } from '../data/services/taskService';

function useCreateTask() {
  const { setOngoingTask } = useOngoingTask();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  const mutate = useCallback(
    async (task: TaskCreateInput) => {
      try {
        setError(undefined);
        const newTask = await createTaskMutation(task);
        setOngoingTask(newTask);
        setSuccess(true);
      } catch (error: any) {
        setError(error.message);
      }
    },
    [setOngoingTask],
  );

  return { mutate, success, error };
}

export default useCreateTask;
