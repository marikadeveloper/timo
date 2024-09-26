import React from 'react';
import './styles.scss';

type UnstyledButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const UnstyledButton: React.FC<UnstyledButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      className='unstyled-button'
      {...props}>
      {children}
    </button>
  );
};

export default UnstyledButton;
