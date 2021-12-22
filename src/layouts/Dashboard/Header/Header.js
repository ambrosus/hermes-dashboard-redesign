import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import logoIcon from '../../../assets/svg/logo.svg';
import searchIcon from '../../../assets/svg/search.svg';
import personIcon from '../../../assets/svg/person.svg';
import UiButton from '../../../components/UiButton';

const headerConfig = [
  {
    link: '/dashboard/node',
    text: 'Node',
  },
  {
    link: '/dashboard/organization',
    text: 'Organization',
  },
  {
    link: '/dashboard/assets',
    text: 'Assets',
  },
];

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const showSearchBar = () => history.push('/dashboard/assets/search');

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/dashboard/assets">
          <ReactSVG src={logoIcon} wrapper="span" />
        </Link>
      </div>
      <div className="header__menu">
        {headerConfig.map(({ link, text }) => (
          <div key={text} className="header__menu-link">
            {pathname === link && <div className="header__menu-link--active" />}
            <Link to={link} className="test">
              {text}
            </Link>
          </div>
        ))}
      </div>
      <div className="header__setting">
        <UiButton type="icon" onclick={showSearchBar}>
          <img src={searchIcon} alt="search-icon" />
        </UiButton>
        <UiButton type="icon">
          <img src={personIcon} alt="user-icon" />
        </UiButton>
      </div>
    </header>
  );
};

export default Header;
