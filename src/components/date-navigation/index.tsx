import dayjs from 'dayjs';
import { useState } from 'react';
import { getFormattedDayVerbose } from '../../utils';
import IconButton from '../icon-button';
import UnstyledButton from '../unstyled-button';
import './styles.scss';

function DateNavigation({ defaultDate, dateChanged }: DateNavigationProps) {
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
      <UnstyledButton aria-label='Click to show a calendar'>
        {getFormattedDayVerbose(date)}
      </UnstyledButton>
      <IconButton
        ariaLabel='Next day'
        iconAriaLabel='A chevron pointing right'
        iconName='chevron-forward'
        onClick={() => changeDate(date.add(1, 'day'))}
      />
      {/* TODO: add datepicker? */}
    </nav>
  );
}

type DateNavigationProps = {
  dateChanged: (newDate: dayjs.Dayjs) => void;
  defaultDate: dayjs.Dayjs;
};

export default DateNavigation;
