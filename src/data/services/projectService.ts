import {
  getRandomProjectColor,
  isColorContrastSufficient,
  isProjectCodeDuplicate,
  isProjectCodeValid,
  PROJECT_CODE_MAX_LENGTH,
  PROJECT_CODE_MIN_LENGTH,
} from '../../utils/projectUtils';
import db from '../db';
import { ProjectCreateInput, ProjectUpdateInput } from '../interfaces/Project';
import { getTasksByProject } from './taskService';

const getAllProjects = async () => {
  return db.projects.toArray();
};

const getProjectById = async (id: number) => {
  return db.projects.get(id);
};

const createProject = async ({ code, name, color }: ProjectCreateInput) => {
  if (!code?.trim()) {
    throw new Error('Code is required');
  }
  if (!isProjectCodeValid(code)) {
    throw new Error(
      `Invalid project code. Must be between ${PROJECT_CODE_MIN_LENGTH} and ${PROJECT_CODE_MAX_LENGTH} letters, no spaces or special characters`,
    );
  }
  if (await isProjectCodeDuplicate(code)) {
    throw new Error('Project with this code already exists');
  }
  if (!name?.trim()) {
    throw new Error('Name is required');
  }
  if (!color?.trim()) {
    // assign a random color
    color = getRandomProjectColor('light');
  } else {
    // validate color
    if (!isColorContrastSufficient(color)) {
      throw new Error(
        'Black text is not readable on this background color. Choose a lighter one',
      );
    }
  }

  return db.projects.add({
    code: code,
    name,
    color,
  });
};

const updateProject = async ({ id, name }: ProjectUpdateInput) => {
  if (!name?.trim()) {
    throw new Error('Name is required');
  }
  return db.projects.update(id, { name });
};

const deleteProject = async (id: number) => {
  const projectTasks = await getTasksByProject(id);
  if (projectTasks?.length) {
    throw new Error('Cannot delete a project with tasks assigned');
  }
  return db.projects.delete(id);
};

export {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
};
