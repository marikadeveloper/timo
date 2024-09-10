import { ReactSVG } from 'react-svg';
import './styles.scss';

function Icon({ ariaLabel, name }: IconProps) {
  return (
    <ReactSVG
      className='icon'
      aria-label={ariaLabel}
      src={`src/assets/images/${name}.svg`}
    />
  );
}

type IconProps = {
  ariaLabel: string;
  name: string;
};

export default Icon;
