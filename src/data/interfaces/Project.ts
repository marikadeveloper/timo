interface Project {
  id: number;
  code: string;
  color: string;
  name: string;
}
interface ProjectCreateInput {
  code?: string;
  color: string;
  name: string;
}
interface ProjectUpdateInput {
  id: number;
  code?: string;
  color?: string;
  name?: string;
}
export type { Project, ProjectCreateInput, ProjectUpdateInput };
