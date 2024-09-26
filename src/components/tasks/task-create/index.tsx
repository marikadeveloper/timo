import React, { useState } from 'react';
import { TaskCreateInput } from '../../../data/interfaces/Task';
import Button from '../../shared/button';
import Input from '../../shared/input';
import ProjectSelect from './project-select';
import './styles.scss';

const TaskCreate: React.FC = () => {
  const [taskCreateInput, setTaskCreateInput] = useState<TaskCreateInput>({
    description: '',
    projectId: undefined,
  });

  const onFieldChange = (field: keyof TaskCreateInput, value: string) => {
    setTaskCreateInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(taskCreateInput);
  };

  return (
    <form
      className='task-create'
      onSubmit={handleSubmit}>
      <Input
        className='task-create__input'
        type='text'
        placeholder='What are you working on?'
        required
        value={taskCreateInput.description}
        onChange={(e) => onFieldChange('description', e.target.value)}
      />
      <div>
        <ProjectSelect
          value={taskCreateInput.projectId}
          onChange={(newValue) => onFieldChange('projectId', newValue)}
        />
        <Button type='submit'>Start</Button>
      </div>
    </form>
  );
};

export default TaskCreate;
