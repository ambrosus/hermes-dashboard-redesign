import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import logoIcon from '../../../assets/svg/logo.svg';
import { ReactComponent as SearchIcon } from '../../../assets/svg/search.svg';
import { ReactComponent as UserIcon } from '../../../assets/svg/person.svg';
import UiButton from '../../../components/UiButton';
import { handleModal } from '../../../store/modules/modal';
import { useDetectOutsideClick } from '../../../utils/useDetectOutsideClick';

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const ref = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);
  const openedModalName = useSelector((state) => state.modal.openedModal.name);

  const [isUserMenuOpened, setIsUserMenuOpened] = useDetectOutsideClick(
    ref,
    false,
  );

  const isSuperAccount = userInfo.permissions?.includes('super_account');

  const headerConfig = isSuperAccount
    ? [
        {
          link: '/dashboard/node',
          text: 'Node',
        },
      ]
    : [
        {
          link: '/dashboard/organization',
          text: 'Organization',
        },
        {
          link: '/dashboard/assets',
          text: 'Assets',
        },
      ];

  const showSearchBar = () => dispatch(handleModal({ name: 'searchModal' }));
  const closeModals = () => {
    if (openedModalName) {
      dispatch(handleModal({ name: '' }));
    }
  };

  const toggleMenuVisibility = () => setIsUserMenuOpened((isOpen) => !isOpen);
  const logout = () => {
    sessionStorage.removeItem('user_private_key');
    sessionStorage.removeItem('user_account');
    localStorage.removeItem('createAssetData');

    window.location.reload();
  };

  return (
    <header role="presentation" className="header" onClick={closeModals}>
      <div className="header__logo">
        <Link to="/dashboard/assets">
          <ReactSVG src={logoIcon} wrapper="span" />
        </Link>
      </div>
      <div className="header__menu">
        {headerConfig.map(({ link, text }) => (
          <div key={text} className="header__menu-link">
            {pathname.includes(link) && (
              <div className="header__menu-link--active" />
            )}
            <Link to={link}>{text}</Link>
          </div>
        ))}
      </div>
      <div className="header__setting">
        {!isSuperAccount && openedModalName !== 'searchModal' && (
          <UiButton
            type="icon"
            styles={{ marginRight: 20 }}
            onclick={showSearchBar}
          >
            <SearchIcon />
          </UiButton>
        )}
        <UiButton onclick={toggleMenuVisibility} type="icon">
          <UserIcon />
        </UiButton>
        {isUserMenuOpened && (
          <ul className="header__user-menu" ref={ref}>
            {!isSuperAccount && (
              <Link
                to="/dashboard/organization#settings"
                className="header__user-menu-item"
              >
                Settings
              </Link>
            )}
            <li
              className="header__user-menu-item"
              onClick={logout}
              role="presentation"
            >
              Logout
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
