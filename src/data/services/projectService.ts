import {
  generateProjectCode,
  isProjectCodeValid,
  PROJECT_CODE_MAX_LENGTH,
  PROJECT_CODE_MIN_LENGTH,
} from '../../utils';
import db from '../db';
import { ProjectCreateInput, ProjectUpdateInput } from '../interfaces/Project';

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
  return db.projects.add({
    code: code || generateProjectCode(name),
    name,
    color,
  });
};

const updateProject = async ({ id, code, name, color }: ProjectUpdateInput) => {
  if (!name?.trim()) {
    throw new Error('Name is required');
  }
  return db.projects.update(id, { code, name, color });
};

const deleteProject = async (id: number) => {
  return db.projects.delete(id);
};

export {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
};
