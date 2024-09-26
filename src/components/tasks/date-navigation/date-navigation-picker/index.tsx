import dayjs from 'dayjs';
import React from 'react';
import {
  getWeekdayString,
  VERBOSE_DATE_FORMAT,
} from '../../../utils/dateUtils';
import DatePicker from '../../shared/date-picker';
import './styles.scss';

type DateNavigationPickerProps = {
  date: dayjs.Dayjs;
  dateChanged: (newDate: dayjs.Dayjs) => void;
};

const DateNavigationPicker: React.FC<DateNavigationPickerProps> = ({
  date,
  dateChanged,
}) => {
  return (
    <div className='date-navigation-picker'>
      <p>{getWeekdayString(date)}</p>
      <DatePicker
        defaultDate={date}
        dateChanged={dateChanged}
        format={VERBOSE_DATE_FORMAT}
      />
    </div>
  );
};

export default DateNavigationPicker;
