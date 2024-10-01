import React from 'react';
import Button from '../button';
import './styles.scss';

export type ButtonGroupProps = {
  onChange: (value: string) => void;
  value: string;
  config: { value: string; label: string }[];
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  config,
  onChange,
  value,
}) => {
  return (
    <div className='button-group'>
      {config.map((item) => (
        <Button
          key={item.value}
          onClick={() => onChange(item.value)}
          aria-label={`Choice: ${item.label} ${
            item.value === value ? '(currently selected)' : ''
          }`}
          className={item.value === value ? 'active' : ''}>
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
