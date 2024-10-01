import DRP from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import React from 'react';
import 'react-calendar/dist/Calendar.css';
import Icon from '../icon';
import './styles.scss';

type DateRangeValuePiece = Date | null;

export type DateRangeValue =
  | DateRangeValuePiece
  | [DateRangeValuePiece, DateRangeValuePiece];

type DateRangePickerProps = {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <DRP
      calendarIcon={
        <Icon
          name='calendar'
          ariaLabel='calendar'
        />
      }
      format='dd/MM/yyyy'
      className='date-range-picker'
      onChange={onChange}
      value={value}
    />
  );
};

export default DateRangePicker;
