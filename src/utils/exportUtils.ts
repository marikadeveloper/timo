import dayjs from 'dayjs';
import db from '../data/db';
import { ExportType } from '../data/interfaces/Export';
import { Project } from '../data/interfaces/Project';
import { Task } from '../data/interfaces/Task';
import { getTaskDurationString } from './taskUtils';

export const getExportTitle = (
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

export const getExportFileName = (
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

export const validateExportInput = (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
): void => {
  if (!exportType) throw new Error('Missing export type');
  if (exportType === 'range' && (!rangeStart || !rangeEnd))
    throw new Error('Missing range start or range end');
};

export const initializeCsvHeader = (exportTitle: string): string => {
  return `${exportTitle},,,,\nProject,Task,Time,Duration\n`;
};

export const fetchTasksToExport = async (
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

export const attachProjectAndParentToTasks = async (
  tasks: (Task & { project?: Project; parent?: Task })[],
): Promise<void> => {
  await Promise.all(
    tasks.map(async (task) => {
      const [project, parent] = await Promise.all([
        task.projectId ? db.projects.get(task.projectId) : undefined,
        task.parentId ? db.tasks.get(task.parentId) : undefined,
      ]);
      task.project = project;
      task.parent = parent;
    }),
  );
};

export const formatTasksToCsv = (
  tasks: (Task & { project?: Project })[],
  exportType: ExportType,
): string => {
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

const isNewDay = (prevTask: Task, currentTask: Task): boolean => {
  return (
    dayjs(prevTask.createdAt).format('DD/MM/YYYY') !==
    dayjs(currentTask.createdAt).format('DD/MM/YYYY')
  );
};

export const downloadTasksCsv = (
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
