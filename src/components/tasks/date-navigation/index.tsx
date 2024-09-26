import dayjs from 'dayjs';
import React, { useState } from 'react';
import IconButton from '../../shared/icon-button';
import DateNavigationPicker from './date-navigation-picker';
import './styles.scss';

type DateNavigationProps = {
  dateChanged: (newDate: dayjs.Dayjs) => void;
  defaultDate: dayjs.Dayjs;
};

const DateNavigation: React.FC<DateNavigationProps> = ({
  defaultDate,
  dateChanged,
}) => {
  const [date, setDate] = useState(defaultDate);

  const changeDate = (newDate: dayjs.Dayjs) => {
    setDate(newDate);
    dateChanged(newDate);
  };

  return (
    <nav className='date-navigation'>
      <IconButton
        ariaLabel='Previous day'
        iconAriaLabel='A chevron pointing left'
        iconName='chevron-back'
        onClick={() => changeDate(date.subtract(1, 'day'))}
      />
      <DateNavigationPicker
        date={date}
        dateChanged={changeDate}
      />
      <IconButton
        ariaLabel='Next day'
        iconAriaLabel='A chevron pointing right'
        iconName='chevron-forward'
        onClick={() => changeDate(date.add(1, 'day'))}
      />
    </nav>
  );
};

export default DateNavigation;
