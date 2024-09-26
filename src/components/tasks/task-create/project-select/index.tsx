import React, { useEffect, useState } from 'react';
import { Project } from '../../../../data/interfaces/Project';
import { getAllProjects } from '../../../../data/services/projectService';
import Select, { SelectOption } from '../../../shared/select';

type ProjectSelectProps = {
  value?: number;
  onChange: (value: string) => void;
};

const ProjectSelect: React.FC<ProjectSelectProps> = ({ onChange, value }) => {
  const [projects, setProjects] = useState<SelectOption[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getAllProjects();
      setProjects(
        projects?.map((p: Project) => ({
          value: p.id.toString(),
          label: p.name,
        })) || [],
      );
    };
    fetchProjects();
  }, []);

  return (
    <Select
      onChange={onChange}
      options={projects}
      placeholder='Select a project'
      value={value?.toString() || ''}
    />
  );
};

export default ProjectSelect;
