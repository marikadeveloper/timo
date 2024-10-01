import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import Button from '../../components/shared/button';
import ButtonGroup from '../../components/shared/button-group';
import DateRangePicker, {
  DateRangeValue,
} from '../../components/shared/date-range-picker';
import FormErrors from '../../components/shared/form-errors';
import ProjectSelect from '../../components/shared/project-select';
import { exportTasks } from '../../data/services/exportService';
import { getDateRangeValueAsArray } from '../../utils/dateUtils';
import './styles.scss';

const isCustomDateRangeSelected = (dateRange: DateRangeValue): boolean => {
  if (!dateRange) return false;

  if (!Array.isArray(dateRange)) {
    // if dateRange is a date, it should be a valid date and not null
    return dateRange !== null;
  }

  return dateRange.some((date) => date !== null);
};

const getDateRangeValueFromDateRangeType = (
  dateRangeType: DateRangeType,
): DateRangeValue => {
  const today = new Date();
  switch (dateRangeType) {
    case 'today':
      return [today, today];
    case 'this-week':
      return [dayjs().startOf('week').toDate(), today];
    case 'this-month':
      return [dayjs().startOf('month').toDate(), today];
    case 'this-year':
      return [dayjs().startOf('year').toDate(), today];
    default:
      return [null, null];
  }
};

const getDateRangeTypeFromDateRangeValue = (
  dateRange: DateRangeValue,
): DateRangeType | undefined => {
  if (!dateRange) return undefined;

  if (!Array.isArray(dateRange)) return undefined;

  const [start, end] = dateRange;

  if (!start || !end) return undefined;

  const today = new Date();

  if (dayjs(start).isSame(today, 'day') && dayjs(end).isSame(today, 'day')) {
    return 'today';
  }

  if (
    dayjs(start).isSame(dayjs().startOf('week'), 'day') &&
    dayjs(end).isSame(today, 'day')
  ) {
    return 'this-week';
  }

  if (
    dayjs(start).isSame(dayjs().startOf('month'), 'day') &&
    dayjs(end).isSame(today, 'day')
  ) {
    return 'this-month';
  }

  if (
    dayjs(start).isSame(dayjs().startOf('year'), 'day') &&
    dayjs(end).isSame(today, 'day')
  ) {
    return 'this-year';
  }

  return undefined;
};

type DateRangeType = 'today' | 'this-week' | 'this-month' | 'this-year';

const Exports: React.FC = () => {
  const [project, setProject] = React.useState<number | undefined>();
  const [dateRangeType, setDateRangeType] = React.useState<
    DateRangeType | undefined
  >();
  const [dateRange, setDateRange] = React.useState<DateRangeValue>([
    null,
    null,
  ]);
  const [exportError, setExportError] = React.useState<string | null>(null);

  useEffect(() => {
    // if date range custom selected, remove date range type
    if (isCustomDateRangeSelected(dateRange)) {
      setDateRangeType(getDateRangeTypeFromDateRangeValue(dateRange));
    } else {
      setDateRangeType(undefined);
    }
  }, [dateRange]);

  useEffect(() => {
    // if date range type selected, fill date range with the selected range
    if (dateRangeType) {
      setDateRange(getDateRangeValueFromDateRangeType(dateRangeType));
    }
  }, [dateRangeType]);

  const getSummary = () => {
    if (!dateRangeType && !isCustomDateRangeSelected(dateRange) && !project) {
      return 'Export all tasks (can be slow)';
    }
    // example output: Export tasks of this week, of project 1
    const output: string[] = ['Export tasks'];

    if (dateRangeType) {
      output.push(`of ${dateRangeType}`);
    } else if (isCustomDateRangeSelected(dateRange)) {
      output.push('of custom range');
    }

    if (project) {
      output.push(`of project ${project}`);
    }

    return output.join(' ');
  };

  const handleExport = async () => {
    try {
      await exportTasks({
        dateRange: getDateRangeValueAsArray(dateRange),
      });
    } catch (error) {
      console.error('Error exporting tasks', { error });
      if (error instanceof Error) {
        setExportError(error.message);
      } else {
        setExportError('An unknown error occurred');
      }
    }
  };

  return (
    <div className='exports'>
      <section>
        <p>1. Select date range</p>
        <div>
          <ButtonGroup
            config={[
              { value: 'today', label: 'Today' },
              { value: 'this-week', label: 'This week' },
              { value: 'this-month', label: 'This month' },
              { value: 'this-year', label: 'This year' },
            ]}
            value={dateRangeType || ''}
            onChange={(value) => setDateRangeType(value as DateRangeType)}
          />
        </div>
        <div>
          <p>Custom range</p>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </section>
      <section>
        <p>2. Select a project</p>
        <ProjectSelect
          onChange={setProject}
          value={project}
        />
      </section>
      <section>
        <p>3. Download CSV</p>
        <p>{getSummary()}</p>
        <Button onClick={handleExport}>Export</Button>
      </section>
      {exportError && <FormErrors errors={[exportError]} />}
    </div>
  );
};

export default Exports;
