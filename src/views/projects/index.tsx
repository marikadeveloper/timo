import React from 'react';
import Project from '../../components/projects/project';
import ProjectCreate from '../../components/projects/project-create';
import { useLiveProjects } from '../../hooks/useLiveProjects';
import './styles.scss';

const Projects: React.FC = () => {
  const { projects } = useLiveProjects();

  return (
    <div className='projects'>
      <section className='projects__list'>
        {!projects?.length && <p>Create a project below 🙂 ⏬️</p>}
        {projects?.map((project) => (
          <Project
            key={project.id}
            project={project}
          />
        ))}
      </section>
      <section className='projects__footer'>
        <ProjectCreate />
      </section>
    </div>
  );
};

export default Projects;
