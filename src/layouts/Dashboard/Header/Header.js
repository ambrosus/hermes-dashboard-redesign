import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { useDetectOutsideClick } from '../../../utils/useDetectOutsideClick';

import logoIcon from '../../../assets/svg/logo.svg';
import searchIcon from '../../../assets/svg/search.svg';
import personIcon from '../../../assets/svg/person.svg';
import SearchInput from '../../../components/SearchInput';
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
  const slideSearchRef = useRef(null);
  const { pathname } = useLocation();
  const [isActiveSlideSearch, setIsActiveSlideSearch] = useDetectOutsideClick(
    slideSearchRef,
    false,
  );

  const showSearchBar = () => setIsActiveSlideSearch(true);

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
        {!isActiveSlideSearch ? (
          <UiButton type="icon" onClick={showSearchBar}>
            <img src={searchIcon} alt="search-icon" />
          </UiButton>
        ) : (
          <SearchInput className="header__search-input" />
        )}
        <UiButton type="icon">
          <img src={personIcon} alt="user-icon" />
        </UiButton>
      </div>
    </header>
  );
};

export default Header;
