import React from 'react';
import './styles.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={`button ${className || ''}`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
