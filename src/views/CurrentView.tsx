import { useViewContext } from '../context/view-context';

function CurrentView() {
  const { view } = useViewContext();

  return (
    <div>
      <p>Current View: {view}</p>
    </div>
  );
}

export default CurrentView;
