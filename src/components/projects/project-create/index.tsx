import React, { useEffect, useState } from 'react';
import { ProjectCreateInput } from '../../../data/interfaces/Project';
import useCreateProject from '../../../hooks/useCreateProject';
import { getRandomProjectColor } from '../../../utils/projectUtils';
import Button from '../../shared/button';
import ColorPicker from '../../shared/color-picker';
import FormErrors from '../../shared/form-errors';
import Input from '../../shared/input';
import './styles.scss';

const emptyProjectCreateInput: ProjectCreateInput = {
  code: '',
  name: '',
  color: getRandomProjectColor('light'),
};

const ProjectCreate: React.FC = () => {
  const [projectCreateInput, setProjectCreateInput] =
    useState<ProjectCreateInput>(emptyProjectCreateInput);

  const { mutate: createProject, success, error } = useCreateProject();

  useEffect(() => {
    if (success) {
      setProjectCreateInput({
        ...emptyProjectCreateInput,
        color: getRandomProjectColor('light'),
      });
    }
  }, [success]);

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
      <h3 className='title--mini'>Create a project</h3>
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

      {error && <FormErrors errors={[error]} />}
    </form>
  );
};

export default ProjectCreate;
