interface Project {
  id: number;
  code?: string;
  name: string;
  color: string;
}
interface ProjectCreateInput {
  code?: string;
  name: string;
  color: string;
}
interface ProjectUpdateInput {
  id: number;
  code?: string;
  name?: string;
  color?: string;
}
export type { Project, ProjectCreateInput, ProjectUpdateInput };
