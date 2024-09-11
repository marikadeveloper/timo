import { useViewContext } from '../../../context/view-context';
import { DEFAULT_VIEW } from '../../../utils/viewUtils';
import Icon from '../../icon';
import HeaderNavButton from './header-nav-button';
import './styles.scss';

function Header() {
  const { view, setView } = useViewContext();
  return (
    <header className='header'>
      <button
        className='header__logo'
        onClick={() => setView(DEFAULT_VIEW)}>
        <Icon
          name='logo'
          ariaLabel='Timo Logo, a clock icon'
        />
        <h4>Timo</h4>
      </button>
      <nav>
        <ul>
          <li>
            <HeaderNavButton
              active={view === 'tasks'}
              text='Tasks'
              view='tasks'
              onClick={setView}
            />
          </li>
          <li>
            <HeaderNavButton
              active={view === 'projects'}
              text='Projects'
              view='projects'
              onClick={setView}
            />
          </li>
          <li>
            <HeaderNavButton
              active={view === 'exports'}
              text='Exports'
              view='exports'
              onClick={setView}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
