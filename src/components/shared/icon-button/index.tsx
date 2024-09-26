import React from 'react';
import Icon from '../icon';
import './styles.scss';

type IconButtonProps = {
  ariaLabel: string;
  iconAriaLabel: string;
  iconName: string;
  onClick: () => void;
  variant?: 'blackBg' | 'whiteBg';
};

const IconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  iconAriaLabel,
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
        name={iconName}
      />
    </button>
  );
};

export default IconButton;
