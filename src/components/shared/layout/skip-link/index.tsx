import './styles.scss';

const SkipLink: React.FC = () => {
  return (
    <>
      <a
        id='skip-link'
        href='#main-content'>
        Skip to main content
      </a>
      <a
        id='skip-task-create'
        href='#task-create-input'>
        Skip to task creation
      </a>
    </>
  );
};

export default SkipLink;
