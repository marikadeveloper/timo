import { useCallback, useState } from 'react';
import { ProjectCreateInput } from '../data/interfaces/Project';
import { createProject } from '../data/services/projectService';

function useCreateProject() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const mutate = useCallback(async (project: ProjectCreateInput) => {
    try {
      setError(undefined);
      await createProject(project);
      setSuccess(true);
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
  }, []);

  return { mutate, success, error };
}

export default useCreateProject;
