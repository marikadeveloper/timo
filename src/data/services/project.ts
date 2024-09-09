import db from '../db';
import { ProjectCreateInput, ProjectUpdateInput } from '../interfaces/Project';

const getAllProjects = async () => {
  return db.projects.toArray();
};

const getProjectById = async (id: number) => {
  return db.projects.get(id);
};

const createProject = async ({ code, name, color }: ProjectCreateInput) => {
  if (!name?.trim()) {
    throw new Error('Name is required');
  }
  return db.projects.add({
    code,
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
