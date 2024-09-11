import Header from './header';
import SkipLink from './skip-link';
import './styles.scss';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='layout'>
      <SkipLink />
      <Header />
      <main
        id='main-content'
        className='layout__content'>
        {children}
      </main>
    </div>
  );
}

export default Layout;
