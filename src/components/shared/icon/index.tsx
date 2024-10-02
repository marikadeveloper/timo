import React from 'react';
import { ReactSVG } from 'react-svg';
import './styles.scss';

type IconProps = {
  ariaLabel: string;
  fill?: string;
  name: string;
};

const Icon: React.FC<IconProps> = ({
  ariaLabel,
  fill = 'currentColor',
  name,
}) => {
  return (
    <ReactSVG
      aria-label={ariaLabel}
      className='icon'
      style={{
        color: fill,
      }}
      src={`assets/images/${name}.svg`}
    />
  );
};

export default Icon;
