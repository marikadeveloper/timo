import React from 'react';
import './styles.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`input ${className}`}
      {...props}
    />
  );
};

export default Input;
