import React from 'react';
import './styles.scss';

const TaskCreate: React.FC = () => {
  return (
    <div className='task-create'>
      <input
        type='text'
        placeholder='What are you working on?'
      />
      <div></div>
    </div>
  );
};

export default TaskCreate;
