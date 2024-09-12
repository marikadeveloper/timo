import React, { useState } from 'react';
import { TaskCreateInput } from '../../data/interfaces/Task';
import Button from '../button';
import Input from '../input';
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

  return (
    <div className='task-create'>
      <Input
        type='text'
        placeholder='What are you working on?'
        value={taskCreateInput.description}
        onChange={(e) => onFieldChange('description', e.target.value)}
      />
      <div>
        <ProjectSelect
          value={taskCreateInput.projectId}
          onChange={(newValue) => onFieldChange('projectId', newValue)}
        />
        <Button
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default TaskCreate;
