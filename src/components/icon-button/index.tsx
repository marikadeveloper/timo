import Icon from '../icon';
import './styles.scss';

function IconButton({
  ariaLabel,
  iconAriaLabel,
  iconName,
  onClick,
  variant = 'whiteBg',
}: IconButtonProps) {
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
}

type IconButtonProps = {
  ariaLabel: string;
  iconAriaLabel: string;
  iconName: string;
  onClick: () => void;
  variant?: 'blackBg' | 'whiteBg';
};

export default IconButton;
