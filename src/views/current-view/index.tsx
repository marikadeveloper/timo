import React from 'react';
import { useViewContext } from '../../context/viewContext';
import Tasks from '../tasks';

const CurrentView: React.FC = () => {
  const { view } = useViewContext();

  if (view === 'tasks') {
    return <Tasks />;
  }

  return (
    <div>
      <p>Unsupported view :( or more like 404...</p>
    </div>
  );
};

export default CurrentView;
