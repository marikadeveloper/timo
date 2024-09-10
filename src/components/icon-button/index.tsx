import Icon from '../icon';
import './styles.scss';

function IconButton({
  ariaLabel,
  iconAriaLabel,
  iconName,
  onClick,
}: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className='icon-button'
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
};

export default IconButton;
