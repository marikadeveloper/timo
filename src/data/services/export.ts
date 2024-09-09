import dayjs from 'dayjs';
import db from '../db';
import { Project } from '../interfaces/Project';
import { Task } from '../interfaces/Task';
import { getActivitiesTotalDuration, getActivityDuration } from '../utils';

type ExportType = 'day' | 'week' | 'month' | 'year' | 'range';
type ExportTasksFilter = {
  exportType: ExportType;
  rangeStart?: Date;
  rangeEnd?: Date;
  codeFilter?: string;
};

const getExportTitle = (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
) => {
  let exportTitle = '';

  if (exportType === 'range') {
    return `Export range:,${dayjs(rangeStart).format('DD/MM/YYYY')} to ${dayjs(
      rangeEnd,
    ).format('DD/MM/YYYY')},,,\n`;
  }

  if (exportType === 'day') {
    return `Export day:,${dayjs(rangeStart).format('DD/MM/YYYY')},,,\n`;
  }

  if (['week', 'month', 'year'].includes(exportType)) {
    exportTitle = `Export ${exportType}:,${dayjs()
      .startOf(exportType)
      .format('DD/MM/YYYY')} to ${dayjs()
      .endOf(exportType)
      .format('DD/MM/YYYY')},,,\n`;
  }
  return exportTitle;
};

const getFileName = (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
) => {
  let filename = '';

  if (exportType === 'range') {
    return `export_${dayjs(rangeStart).format('DDMMYYYY')}_to_${dayjs(
      rangeEnd,
    ).format('DDMMYYYY')}.csv`;
  }

  if (exportType === 'day') {
    return `export_${dayjs(rangeStart).format('DDMMYYYY')}.csv`;
  }

  if (['week', 'month', 'year'].includes(exportType)) {
    filename = `export_${dayjs()
      .startOf(exportType)
      .format('DDMMYYYY')}_to_${dayjs()
      .endOf(exportType)
      .format('DDMMYYYY')}.csv`;
  }
  return filename;
};

/*
const exportTasks = async ({
  exportType,
  rangeStart,
  rangeEnd,
}: ExportTasksFilter) => {
  if (!exportType) {
    throw new Error('Missing export type');
  }

  if (exportType === 'range' && (!rangeStart || !rangeEnd)) {
    throw new Error('Missing range start or range end');
  }

  const exportTitle = getExportTitle(exportType, rangeStart, rangeEnd);

  let csv = exportTitle;
  csv += `,,,,\n`;
  csv += `Project,Task,Time,Duration\n`;

  let tasksToExport: (Task & { project?: Project })[] = [];

  const exportUnitOfTime = exportType === 'range' ? 'day' : exportType;

  tasksToExport = await db.tasks
    .where('createdAt')
    .between(
      dayjs(rangeStart).startOf(exportUnitOfTime).toDate(),
      dayjs(rangeEnd).endOf(exportUnitOfTime).toDate(),
    )
    .toArray();

  if (!tasksToExport?.length) {
    throw new Error('No activities found');
  }

  // Attach resolved property "project" on each task
  // using parallel queries:
  await Promise.all(
    tasksToExport.map(async (task) => {
      [task.project] = task.projectId
        ? await Promise.all([db.projects.get(task.projectId)])
        : [undefined];
    }),
  );

  await tasksToExport.forEach(async (task, i) => {
    const timers: string[] = [];

    task.timers.forEach((timeSpan) => {
      timers.push(
        `${dayjs(timeSpan.start).format('HH:mm')} - ${
          timeSpan.end ? dayjs(timeSpan.end).format('HH:mm') : 'in progress'
        }`,
      );
    });

    const duration =
      getActivityDuration(task.timers)?.totalDurationString || '-';
    // for each different day, add a new line with the activity date
    if (exportType !== 'day') {
      if (
        i === 0 ||
        dayjs(tasksToExport[i - 1].createdAt).format('DD/MM/YYYY') !==
          dayjs(task.createdAt).format('DD/MM/YYYY')
      ) {
        csv += ',,,,\n';
        csv += `${dayjs(task.createdAt).format('DD/MM/YYYY')},,,,\n`;
      }
    }

    const projectName = task.projectId
      ? (await getProjectById(task.projectId))?.code
      : '';

    csv += `"${projectName}","${task.description}",${timers.join(
      ' / ',
    )},${duration}\n`;
  });

  const totalDuration = getActivitiesTotalDuration(tasksToExport);
  csv += `,,,TOT: ${totalDuration}\n`;

  // eslint-disable-next-line no-restricted-globals
  const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const csvUrl = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', csvUrl);

  let filename = getFileName(exportType, rangeStart, rangeEnd);

  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
*/

const exportTasks = async ({
  exportType,
  rangeStart,
  rangeEnd,
}: ExportTasksFilter) => {
  validateExportInput(exportType, rangeStart, rangeEnd);

  const exportTitle = getExportTitle(exportType, rangeStart, rangeEnd);
  let csv = initializeCsvHeader(exportTitle);

  const tasksToExport = await fetchTasksToExport(
    exportType,
    rangeStart,
    rangeEnd,
  );
  if (!tasksToExport.length) {
    throw new Error('No activities found');
  }

  await attachProjectAndParentToTasks(tasksToExport);
  csv += formatTasksToCsv(tasksToExport, exportType);

  const totalDuration = getActivitiesTotalDuration(tasksToExport);
  csv += `,,,TOT: ${totalDuration}\n`;

  downloadCsv(csv, exportType, rangeStart, rangeEnd);
};

const validateExportInput = (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
) => {
  if (!exportType) {
    throw new Error('Missing export type');
  }
  if (exportType === 'range' && (!rangeStart || !rangeEnd)) {
    throw new Error('Missing range start or range end');
  }
};

const initializeCsvHeader = (exportTitle: string) => {
  let csv = exportTitle;
  csv += `,,,,\n`;
  csv += `Project,Task,Time,Duration\n`;
  return csv;
};

const fetchTasksToExport = async (
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
) => {
  const exportUnitOfTime = exportType === 'range' ? 'day' : exportType;
  return await db.tasks
    .where('createdAt')
    .between(
      dayjs(rangeStart).startOf(exportUnitOfTime).toDate(),
      dayjs(rangeEnd).endOf(exportUnitOfTime).toDate(),
    )
    .toArray();
};

const attachProjectAndParentToTasks = async (
  tasks: (Task & { project?: Project; parent?: Task })[],
) => {
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

const formatTasksToCsv = (
  tasks: (Task & { project?: Project })[],
  exportType: ExportType,
) => {
  let csv = '';

  tasks.forEach((task, i) => {
    const timers = task.timers.map(
      (timeSpan) =>
        `${dayjs(timeSpan.start).format('HH:mm')} - ${
          timeSpan.end ? dayjs(timeSpan.end).format('HH:mm') : 'in progress'
        }`,
    );

    const duration =
      getActivityDuration(task.timers)?.totalDurationString || '-';
    if (exportType !== 'day' && (i === 0 || isNewDay(tasks[i - 1], task))) {
      csv += ',,,,\n';
      csv += `${dayjs(task.createdAt).format('DD/MM/YYYY')},,,,\n`;
    }

    const projectName = task.projectId ? task.project?.code || '' : '';
    csv += `"${projectName}","${task.description}",${timers.join(
      ' / ',
    )},${duration}\n`;
  });

  return csv;
};

const isNewDay = (prevTask: Task, currentTask: Task) => {
  return (
    dayjs(prevTask.createdAt).format('DD/MM/YYYY') !==
    dayjs(currentTask.createdAt).format('DD/MM/YYYY')
  );
};

const downloadCsv = (
  csv: string,
  exportType: ExportType,
  rangeStart?: Date,
  rangeEnd?: Date,
) => {
  const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const csvUrl = URL.createObjectURL(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', csvUrl);

  const filename = getFileName(exportType, rangeStart, rangeEnd);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
