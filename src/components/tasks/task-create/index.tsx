import React, { useEffect, useState } from 'react';
import { TaskCreateInput } from '../../../data/interfaces/Task';
import useCreateTask from '../../../hooks/useCreateTask';
import Button from '../../shared/button';
import FormErrors from '../../shared/form-errors';
import Input from '../../shared/input';
import ProjectSelect from '../../shared/project-select';
import './styles.scss';

const emptyTaskCreateInput: TaskCreateInput = {
  description: '',
  projectId: undefined,
};

const TaskCreate: React.FC = () => {
  const [taskCreateInput, setTaskCreateInput] =
    useState<TaskCreateInput>(emptyTaskCreateInput);
  const { mutate, success, error } = useCreateTask();

  useEffect(() => {
    if (success) {
      setTaskCreateInput(emptyTaskCreateInput);
    }
  }, [success]);

  const onFieldChange = (field: keyof TaskCreateInput, value: string | number) => {
    setTaskCreateInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(taskCreateInput);
  };

  return (
    <form
      className='task-create'
      onSubmit={handleSubmit}>
      <h3 className='title--mini'>Create a task</h3>
      <Input
        id='task-create-input'
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
      <section>{error && <FormErrors errors={[error]} />}</section>
    </form>
  );
};

export default TaskCreate;
