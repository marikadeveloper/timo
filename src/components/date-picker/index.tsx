import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import ReactDatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import { DEFAULT_DATE_FORMAT } from '../../utils';
import './styles.scss';

// picked from the official doc
export type DatePickerValuePiece = Date | null;
type DatePickerValue =
  | DatePickerValuePiece
  | [DatePickerValuePiece, DatePickerValuePiece];

const today = new Date();

function DatePicker({
  dateChanged,
  defaultDate,
  format = DEFAULT_DATE_FORMAT,
}: DatePickerProps) {
  const [date, setDate] = useState<Date>(defaultDate.toDate() || today);

  useEffect(() => {
    setDate(defaultDate.toDate());
  }, [defaultDate]);

  const changeDate = (newDate: DatePickerValue) => {
    // I don't know how the date can be null because I removed the clearIcon.
    const updatedValue = newDate === null ? today : (newDate as Date);
    setDate(updatedValue);
    dateChanged(dayjs(updatedValue));
  };

  return (
    <ReactDatePicker
      calendarIcon={null}
      clearIcon={null}
      className='date-picker'
      format={format}
      onChange={changeDate}
      value={date}
    />
  );
}

type DatePickerProps = {
  dateChanged: (newDate: dayjs.Dayjs) => void;
  defaultDate: dayjs.Dayjs;
  format?: string;
  selectRange?: boolean;
};

export default DatePicker;
