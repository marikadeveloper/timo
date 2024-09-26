import React from 'react';
import { AppView } from '../../../../data/interfaces/View';
import './styles.scss';

type HeaderNavButtonProps = {
  active: boolean;
  onClick: (view: AppView) => void;
  text: string;
  view: AppView;
};

const HeaderNavButton: React.FC<HeaderNavButtonProps> = ({
  active,
  onClick,
  text,
  view,
}) => {
  return (
    <button
      className={`header-nav-button ${active ? 'active' : ''}`}
      onClick={() => onClick(view)}>
      {text}
    </button>
  );
};

export default HeaderNavButton;
