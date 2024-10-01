import {
  downloadTasksCsv,
  fetchTasksToExport,
  formatTasksToCsv,
  getExportTitle,
  initializeCsvHeader,
  validateExportInput,
} from '../../utils/exportUtils';
import { getTasksDurationString } from '../../utils/taskUtils';
import { ExportTasksFilter } from '../interfaces/Export';

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
  tasks,
}: ExportTasksFilter) => {
  validateExportInput(exportType, rangeStart, rangeEnd);

  const exportTitle = getExportTitle(exportType, rangeStart, rangeEnd);
  let csv = initializeCsvHeader(exportTitle);

  let tasksToExport = [];
  if (tasks) {
    tasksToExport = tasks;
  } else {
    tasksToExport = await fetchTasksToExport(exportType, rangeStart, rangeEnd);
  }
  if (!tasksToExport.length) {
    throw new Error('No activities found');
  }

  csv += formatTasksToCsv(tasksToExport, exportType);

  const totalDuration = await getTasksDurationString(tasksToExport);
  csv += `,,,TOT: ${totalDuration}\n`;

  downloadTasksCsv(csv, exportType, rangeStart, rangeEnd);
};

export { exportTasks };
