import React from 'react';
import './styles.scss';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`card ${className}`}
      {...props}>
      {children}
    </div>
  );
};

export default Card;
