import { useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import type { Project } from '../../../data/interfaces/Project';
import { deleteProject } from '../../../data/services/projectService';
import Card from '../../shared/card';
import IconButton from '../../shared/icon-button';
import './styles.scss';

type ProjectProps = {
  project: Project;
};

const Project: React.FC<ProjectProps> = ({ project }) => {
  // TODO: project delete and inline edit (on click)

  const [state, setState] = useState({ html: project.name });

  const handleChange = (e: ContentEditableEvent) => {
    setState({ html: e.target.value });
  };

  const onProjectDelete = () => {
    deleteProject(project.id);
  };

  return (
    <Card className='project'>
      <p>{project.code}</p>
      <ContentEditable
        html={state.html} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={handleChange} // handle innerHTML change
      />
      <IconButton
        iconFill='red'
        iconName='trash'
        ariaLabel='Delete project'
        iconAriaLabel='Trash can'
        onClick={onProjectDelete}
      />
    </Card>
  );
};

export default Project;
