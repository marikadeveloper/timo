import logo from '../../assets/images/logo.svg';
import { useViewContext } from '../../context/view-context';
import HeaderNavButton from '../header-nav-button';
import './styles.scss';

function Header() {
  const { view, setView } = useViewContext();
  return (
    <header className='header'>
      <section className='header__logo'>
        <img
          src={logo}
          alt='Timo Logo, a clock icon'
        />
        <h4>Timo</h4>
      </section>
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
