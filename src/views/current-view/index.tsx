import { useViewContext } from '../../context/view-context';
import Tasks from '../tasks';

function CurrentView() {
  const { view } = useViewContext();

  if (view === 'tasks') {
    return <Tasks />;
  }

  return (
    <div>
      <p>Unsupported view :( or more like 404...</p>
    </div>
  );
}

export default CurrentView;
