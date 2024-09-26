import React, { useState } from 'react';
import { ProjectCreateInput } from '../../../data/interfaces/Project';
import { createProject } from '../../../data/services/projectService';
import Button from '../../shared/button';
import ColorPicker from '../../shared/color-picker';
import Input from '../../shared/input';
import './styles.scss';

const ProjectCreate: React.FC = () => {
  const [projectCreateInput, setProjectCreateInput] =
    useState<ProjectCreateInput>({
      code: '',
      name: '',
      color: '',
    });

  const onFieldChange = (field: keyof ProjectCreateInput, value: string) => {
    setProjectCreateInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProject(projectCreateInput);
  };

  return (
    <form
      className='project-create'
      onSubmit={handleSubmit}>
      <section>
        <Input
          className='project-create__code'
          type='text'
          placeholder='Project code'
          value={projectCreateInput.code}
          onChange={(e) => onFieldChange('code', e.target.value)}
        />
        <Input
          type='text'
          placeholder='Project name'
          required
          value={projectCreateInput.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
        />
      </section>

      <section>
        <ColorPicker
          required
          value={projectCreateInput.color}
          onChange={(e) => onFieldChange('color', e.target.value)}
        />
        <Button type='submit'>Create</Button>
      </section>
    </form>
  );
};

export default ProjectCreate;
