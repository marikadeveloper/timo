import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
  getLocalStoragePinnedDate,
  setLocalStoragePinnedDate,
} from '../../utils';
import IconButton from '../icon-button';

function DatePin({ date }: DatePinProps) {
  const [pinnedDate, setPinnedDate] = useState<dayjs.Dayjs | null>(() =>
    getLocalStoragePinnedDate(),
  );

  useEffect(() => {
    setLocalStoragePinnedDate(pinnedDate);
  }, [pinnedDate]);

  const changePinnedDate = (newDate: dayjs.Dayjs) => {
    if (pinnedDate?.isSame(newDate, 'day')) {
      setPinnedDate(null);
      return;
    }
    setPinnedDate(newDate);
  };

  return (
    <IconButton
      ariaLabel='Pin the current date'
      iconAriaLabel='A pin'
      iconName='pin'
      variant={pinnedDate?.isSame(date, 'day') ? 'blackBg' : 'whiteBg'}
      onClick={() => changePinnedDate(date)}
    />
  );
}

type DatePinProps = {
  date: dayjs.Dayjs;
};

export default DatePin;
