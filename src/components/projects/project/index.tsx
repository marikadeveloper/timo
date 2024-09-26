import type { Project } from '../../../data/interfaces/Project';
import Card from '../../shared/card';

type ProjectProps = {
  project: Project;
};

const Project: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Card className='project'>
      <p>
        {project.code} - {project.name}
      </p>
    </Card>
  );
};

export default Project;
