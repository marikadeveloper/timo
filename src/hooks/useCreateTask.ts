import { useOngoingTask } from '../context/ongoingTaskContext';
import { TaskCreateInput } from '../data/interfaces/Task';
import { createTask as createTaskMutation } from '../data/services/taskService';

function useCreateTask() {
  const { setOngoingTask } = useOngoingTask();
  const createTask = async (task: TaskCreateInput) => {
    const newTask = await createTaskMutation(task);
    setOngoingTask(newTask);
  };
  return createTask;
}

export default useCreateTask;
