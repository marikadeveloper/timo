import { useCallback, useState } from 'react';
import { deleteProject } from '../data/services/projectService';

function useDeleteProject(projectId: number) {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const mutate = useCallback(async () => {
    try {
      setError(undefined);
      await deleteProject(projectId);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

  return { mutate, success, error };
}

export default useDeleteProject;
