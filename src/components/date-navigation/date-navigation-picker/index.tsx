import dayjs from 'dayjs';
import { getWeekdayString, VERBOSE_DATE_FORMAT } from '../../../utils';
import DatePicker from '../../date-picker';
import './styles.scss';

function DateNavigationPicker({
  date,
  dateChanged,
}: DateNavigationPickerProps) {
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
}

type DateNavigationPickerProps = {
  date: dayjs.Dayjs;
  dateChanged: (newDate: dayjs.Dayjs) => void;
};

export default DateNavigationPicker;
