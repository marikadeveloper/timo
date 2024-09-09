type ExportType = 'day' | 'week' | 'month' | 'year' | 'range';
type ExportTasksFilter = {
  exportType: ExportType;
  rangeStart?: Date;
  rangeEnd?: Date;
  codeFilter?: string;
};
export type { ExportTasksFilter, ExportType };
