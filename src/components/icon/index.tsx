import React from 'react';
import { ReactSVG } from 'react-svg';
import './styles.scss';

type IconProps = {
  ariaLabel: string;
  name: string;
};

const Icon: React.FC<IconProps> = ({ ariaLabel, name }) => {
  return (
    <ReactSVG
      className='icon'
      aria-label={ariaLabel}
      src={`src/assets/images/${name}.svg`}
    />
  );
};

export default Icon;
