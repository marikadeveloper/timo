import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
  getLocalStoragePinnedDate,
  setLocalStoragePinnedDate,
} from '../../utils';
import IconButton from '../icon-button';

type DatePinProps = {
  date: dayjs.Dayjs;
};

const DatePin: React.FC<DatePinProps> = ({ date }: DatePinProps) => {
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
};

export default DatePin;
