import dayjs from 'dayjs';
import db from '../data/db';
import { ExportType } from '../data/interfaces/Export';
import { Project } from '../data/interfaces/Project';
import { Task } from '../data/interfaces/Task';
import { Timer } from '../data/interfaces/Timer';
import { getProjectById } from '../data/services/projectService';
import { getTaskById } from '../data/services/taskService';
import { getTimersByTaskId } from '../data/services/timerService';
import { getTaskDurationString } from './taskUtils';

const getExportTitle = (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
): string => {
  if (exportType === 'range') {
    return `Export range:,${dayjs(rangeStart).format('DD/MM/YYYY')} to ${dayjs(
      rangeEnd,
    ).format('DD/MM/YYYY')},,,\n`;
  }
  if (exportType === 'day') {
    return `Export day:,${dayjs(rangeStart).format('DD/MM/YYYY')},,,\n`;
  }
  if (['week', 'month', 'year'].includes(exportType)) {
    return `Export ${exportType}:,${dayjs()
      .startOf(exportType)
      .format('DD/MM/YYYY')} to ${dayjs()
      .endOf(exportType)
      .format('DD/MM/YYYY')},,,\n`;
  }
  return '';
};

const getExportFileName = (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
): string => {
  if (exportType === 'range') {
    return `export_${dayjs(rangeStart).format('DDMMYYYY')}_to_${dayjs(
      rangeEnd,
    ).format('DDMMYYYY')}.csv`;
  }
  if (exportType === 'day') {
    return `export_${dayjs(rangeStart).format('DDMMYYYY')}.csv`;
  }
  if (['week', 'month', 'year'].includes(exportType)) {
    return `export_${dayjs()
      .startOf(exportType)
      .format('DDMMYYYY')}_to_${dayjs()
      .endOf(exportType)
      .format('DDMMYYYY')}.csv`;
  }
  return '';
};

const validateExportInput = (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
): void => {
  if (!exportType) throw new Error('Missing export type');
  if (exportType === 'range' && (!rangeStart || !rangeEnd))
    throw new Error('Missing range start or range end');
};

const initializeCsvHeader = (exportTitle: string): string => {
  return `${exportTitle},,,,\nProject,Task,Time,Duration\n`;
};

const fetchTasksToExport = async (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
): Promise<Task[]> => {
  const exportUnitOfTime = exportType === 'range' ? 'day' : exportType;
  return await db.tasks
    .where('createdAt')
    .between(
      dayjs(rangeStart).startOf(exportUnitOfTime).toDate(),
      dayjs(rangeEnd).endOf(exportUnitOfTime).toDate(),
    )
    .toArray();
};

const attachInfoToTasks = async (
  tasks: (Task & { project?: Project; parent?: Task; timers?: Timer[] })[],
): Promise<void> => {
  await Promise.all(
    tasks.map(async (task) => {
      const [project, parent, timers] = await Promise.all([
        task.projectId ? getProjectById(task.projectId) : undefined,
        task.parentId ? getTaskById(task.parentId) : undefined,
        getTimersByTaskId(task.id),
      ]);
      task.parent = parent;
      task.project = project;
      task.timers = timers;
    }),
  );
};

const formatTasksToCsv = (
  tasks: (Task & { parent?: Task; project?: Project; timers: Timer[] })[],
  exportType: ExportType,
): string => {
  const isNewDay = (prevTask: Task, currentTask: Task): boolean => {
    return (
      dayjs(prevTask.createdAt).format('DD/MM/YYYY') !==
      dayjs(currentTask.createdAt).format('DD/MM/YYYY')
    );
  };

  /**
   * TODO: add parent task to the CSV
   */

  return tasks
    .map((task, i) => {
      const timers = task.timers
        .map(
          (timer) =>
            `${dayjs(timer.start).format('HH:mm')} - ${
              timer.end ? dayjs(timer.end).format('HH:mm') : 'in progress'
            }`,
        )
        .join(' / ');
      const duration = getTaskDurationString(task.timers) || '-';
      const projectName = task.projectId ? task.project?.code || '' : '';
      const dateHeader =
        exportType !== 'day' && (i === 0 || isNewDay(tasks[i - 1], task))
          ? `,,,${dayjs(task.createdAt).format('DD/MM/YYYY')},,,,\n`
          : '';
      return `${dateHeader}"${projectName}","${task.description}",${timers},${duration}\n`;
    })
    .join('');
};

const downloadTasksCsv = (
  csv: string,
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
): void => {
  const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const csvUrl = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', csvUrl);
  link.setAttribute(
    'download',
    getExportFileName(exportType, rangeStart, rangeEnd),
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export {
  attachInfoToTasks,
  downloadTasksCsv,
  fetchTasksToExport,
  formatTasksToCsv,
  getExportFileName,
  getExportTitle,
  initializeCsvHeader,
  validateExportInput,
};
