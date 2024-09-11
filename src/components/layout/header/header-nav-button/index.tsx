import { AppView } from '../../data/interfaces/View';
import './styles.scss';

function HeaderNavButton({
  active,
  onClick,
  text,
  view,
}: HeaderNavButtonProps) {
  return (
    <button
      className={`header-nav-button ${active ? 'active' : ''}`}
      onClick={() => onClick(view)}>
      {text}
    </button>
  );
}

type HeaderNavButtonProps = {
  active: boolean;
  onClick: (view: AppView) => void;
  text: string;
  view: AppView;
};

export default HeaderNavButton;
