import React from 'react';
import Header from './header';
import SkipLink from './skip-link';
import './styles.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
};

export default Layout;
