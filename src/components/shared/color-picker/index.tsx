import React from 'react';
import Input from '../input';
import './styles.scss';

type ColorPickerProps = React.InputHTMLAttributes<HTMLInputElement>;

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  return (
    <Input
      type='color'
      className='color-picker'
      {...props}
    />
  );
};

export default ColorPicker;
