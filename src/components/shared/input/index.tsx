import React from 'react';
import './styles.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className='input'
      {...props}
    />
  );
};

export default Input;
