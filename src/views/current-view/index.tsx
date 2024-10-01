import React from 'react';
import { useViewContext } from '../../context/viewContext';
import Exports from '../exports';
import Projects from '../projects';
import Tasks from '../tasks';

const CurrentView: React.FC = () => {
  const { view } = useViewContext();

  if (view === 'tasks') {
    return <Tasks />;
  }

  if (view === 'projects') {
    return <Projects />;
  }

  if (view === 'exports') {
    return <Exports />;
  }

  return (
    <div>
      <p>Unsupported view :( or more like 404...</p>
    </div>
  );
};

export default CurrentView;
