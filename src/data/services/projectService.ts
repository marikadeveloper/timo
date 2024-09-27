import {
  generateProjectCode,
  isProjectCodeValid,
  PROJECT_CODE_MAX_LENGTH,
  PROJECT_CODE_MIN_LENGTH,
  PROJECTS_DEFAULT_COLORS,
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
  if (code && !isProjectCodeValid(code)) {
    throw new Error(
      `Invalid project code. Must be between ${PROJECT_CODE_MIN_LENGTH} and ${PROJECT_CODE_MAX_LENGTH} letters, no spaces or special characters`,
    );
  }
  if (!name?.trim()) {
    throw new Error('Name is required');
  }
  if (!color?.trim()) {
    // assign a random color
    color =
      PROJECTS_DEFAULT_COLORS[
        Math.floor(Math.random() * PROJECTS_DEFAULT_COLORS.length)
      ];
  }
  return db.projects.add({
    code: code || generateProjectCode(name),
    name,
    color,
  });
};

const updateProject = async ({ id, name, color }: ProjectUpdateInput) => {
  if (!name?.trim()) {
    throw new Error('Name is required');
  }
  return db.projects.update(id, { name, color });
};

const deleteProject = async (id: number) => {
  const tasksCount = await getTasksByProject(id);
  if (tasksCount) {
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
