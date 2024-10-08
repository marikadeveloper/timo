import React from 'react';
import Icon from '../icon';
import './styles.scss';

type IconButtonProps = {
  ariaLabel: string;
  iconAriaLabel: string;
  iconFill?: string;
  iconName: string;
  onClick: () => void;
  variant?: 'blackBg' | 'whiteBg';
};

const IconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  iconAriaLabel,
  iconFill,
  iconName,
  onClick,
  variant = 'whiteBg',
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`icon-button icon-button--${variant}`}
      onClick={onClick}>
      <Icon
        ariaLabel={iconAriaLabel}
        fill={iconFill}
        name={iconName}
      />
    </button>
  );
};

export default IconButton;
