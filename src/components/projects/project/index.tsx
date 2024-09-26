import type { Project } from '../../../data/interfaces/Project';

type ProjectProps = {
  project: Project;
};

const Project: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className='project'>
      <p>
        {project.code} - {project.name}
      </p>
    </div>
  );
};

export default Project;
