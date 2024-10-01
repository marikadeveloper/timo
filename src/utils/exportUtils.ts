import dayjs from 'dayjs';
import { DateRangeValue } from '../components/shared/date-range-picker';
import db from '../data/db';
import { ExportTask } from '../data/interfaces/Export';
import { Project } from '../data/interfaces/Project';
import { Task } from '../data/interfaces/Task';
import { Timer } from '../data/interfaces/Timer';
import { getProjectById } from '../data/services/projectService';
import { getTaskById } from '../data/services/taskService';
import { getTimersByTaskId } from '../data/services/timerService';
import { getTaskDurationString } from './taskUtils';

const getExportTitle = (rangeStart: Date, rangeEnd: Date): string => {
  // same date -> Export day: DD/MM/YYYY
  // different date -> Export range: DD/MM/YYYY to DD/MM/YYYY

  if (dayjs(rangeStart).isSame(rangeEnd, 'day')) {
    return `Export day:,${dayjs(rangeStart).format('DD/MM/YYYY')},,,\n`;
  }

  return `Export range:,${dayjs(rangeStart).format('DD/MM/YYYY')} to ${dayjs(
    rangeEnd,
  ).format('DD/MM/YYYY')},,,\n`;
};

const getExportFileName = (rangeStart: Date, rangeEnd: Date): string => {
  // same date -> export_DDMMYYYY.csv
  // different date -> export_DDMMYYYY_to_DDMMYYYY.csv

  if (dayjs(rangeStart).isSame(rangeEnd, 'day')) {
    return `export_${dayjs(rangeStart).format('DDMMYYYY')}.csv`;
  }

  return `export_${dayjs(rangeStart).format('DDMMYYYY')}_to_${dayjs(
    rangeEnd,
  ).format('DDMMYYYY')}.csv`;
};

const validateExportInput = (dateRange: DateRangeValue): void => {
  if (!dateRange) throw new Error('Missing date range');
};

const initializeCsvHeader = (exportTitle: string): string => {
  return `${exportTitle},,,,\nProject,Task,Time,Duration\n`;
};

const fetchTasksToExport = async (
  rangeStart: Date,
  rangeEnd: Date,
): Promise<ExportTask[]> => {
  console.log('fetchTasksToExport', rangeStart, rangeEnd);
  const tasks = await db.tasks
    .where('createdAt')
    .between(
      dayjs(rangeStart).format('YYYY-MM-DD'),
      dayjs(rangeEnd).format('YYYY-MM-DD'),
    )
    .toArray();

  await attachInfoToTasks(tasks);
  return tasks;
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

const formatTasksToCsv = (tasks: ExportTask[]): string => {
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
      if (!task.timers) return '';

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
        i === 0 || isNewDay(tasks[i - 1], task)
          ? `,,,${dayjs(task.createdAt).format('DD/MM/YYYY')},,,,\n`
          : '';
      return `${dateHeader}"${projectName}","${task.description}",${timers},${duration}\n`;
    })
    .join('');
};

const downloadTasksCsv = (
  csv: string,
  rangeStart: Date,
  rangeEnd: Date,
): void => {
  const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const csvUrl = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', csvUrl);
  link.setAttribute('download', getExportFileName(rangeStart, rangeEnd));
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
