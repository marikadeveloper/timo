import { useCallback, useState } from 'react';
import { ProjectUpdateInput } from '../data/interfaces/Project';
import { updateProject } from '../data/services/projectService';

function useUpdateProject() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const mutate = useCallback(async (input: ProjectUpdateInput) => {
    try {
      setError(undefined);
      await updateProject(input);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  return { mutate, success, error };
}

export default useUpdateProject;
