import { useLiveQuery } from 'dexie-react-hooks';
import { getAllProjects } from '../data/services/projectService';

function useLiveProjects() {
  const projects = useLiveQuery(() => getAllProjects());

  return { projects: projects || [] };
}

export { useLiveProjects };
