import React from 'react';
import './styles.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className='button'
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
