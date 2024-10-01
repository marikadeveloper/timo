import React, { useEffect, useState } from 'react';
import { Project } from '../../../data/interfaces/Project';
import { getAllProjects } from '../../../data/services/projectService';
import Select, { SelectOption } from '../select';

type ProjectSelectProps = {
  value?: number;
  onChange: (value: number) => void;
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

  const handleOnChange = (value: string) => {
    onChange(parseInt(value));
  };

  return (
    <Select
      onChange={handleOnChange}
      options={projects}
      placeholder='Select a project'
      value={value?.toString() || ''}
    />
  );
};

export default ProjectSelect;
