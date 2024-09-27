import React from 'react';
import './styles.scss';

type BlinkingDotProps = {
  color: string;
};

const BlinkingDot: React.FC<BlinkingDotProps> = ({ color }) => {
  return (
    <div
      className='blinking-dot'
      style={{
        backgroundColor: color,
      }}></div>
  );
};

export default BlinkingDot;
