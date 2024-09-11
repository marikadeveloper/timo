import dayjs from 'dayjs';
import { VERBOSE_DATE_FORMAT } from '../../../utils';
import DatePicker from '../../date-picker';

function DateNavigationPicker({
  date,
  dateChanged,
}: DateNavigationPickerProps) {
  return (
    <DatePicker
      defaultDate={date}
      dateChanged={dateChanged}
      format={VERBOSE_DATE_FORMAT}
    />
  );
}

type DateNavigationPickerProps = {
  date: dayjs.Dayjs;
  dateChanged: (newDate: dayjs.Dayjs) => void;
};

export default DateNavigationPicker;
