import { useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import type { Project } from '../../../data/interfaces/Project';
import useDeleteProject from '../../../hooks/useDeleteProject';
import useUpdateProject from '../../../hooks/useUpdateProject';
import Card from '../../shared/card';
import FormErrors from '../../shared/form-errors';
import IconButton from '../../shared/icon-button';
import './styles.scss';

type ProjectProps = {
  project: Project;
};

const Project: React.FC<ProjectProps> = ({ project }) => {
  const nameRef = useRef<HTMLElement>(null);
  const [state, setState] = useState({ html: project.name });
  const { mutate: deleteProject, error: deleteProjectError } = useDeleteProject(
    project.id,
  );
  const { mutate: updateProject } = useUpdateProject();

  const handleChange = (e: ContentEditableEvent) => {
    setState({ html: e.target.value });
  };

  const onProjectDelete = () => {
    deleteProject();
  };

  const onProjectUpdate = () => {
    updateProject({ id: project.id, name: nameRef.current?.innerText });
  };

  return (
    <Card
      className='project'
      style={{
        backgroundColor: project.color,
      }}>
      <section>
        <p>{project.code}</p>
        <ContentEditable
          html={state.html}
          onChange={handleChange} // handle innerHTML change
          innerRef={nameRef}
          onBlur={onProjectUpdate}
        />
        <IconButton
          iconFill='#e42626'
          iconName='trash'
          ariaLabel='Delete project'
          iconAriaLabel='Trash can'
          onClick={onProjectDelete}
        />
      </section>
      {deleteProjectError && <FormErrors errors={[deleteProjectError]} />}
    </Card>
  );
};

export default Project;
