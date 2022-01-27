import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import cx from 'classnames';
import logoIcon from '../../../assets/svg/logo.svg';
import { ReactComponent as SearchIcon } from '../../../assets/svg/search.svg';
import { ReactComponent as UserIcon } from '../../../assets/svg/person.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/svg/settings.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/svg/logout.svg';
import UiButton from '../../../components/UiButton';
import { handleModal } from '../../../store/modules/modal';
import { useDetectOutsideClick } from '../../../utils/useDetectOutsideClick';

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const ref = useRef(null);
  const isAuth = useSelector((state) => state.auth.isAuth);

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
    <header
      role="presentation"
      className="header"
      onClick={closeModals}
      style={{ padding: !isAuth && '0 150px' }}
    >
      <div className="header__logo">
        <Link to="/dashboard/assets">
          <ReactSVG src={logoIcon} wrapper="span" />
        </Link>
      </div>
      <div className="header__menu">
        {!isAuth ? (
          <>
            <Link to="/dashboard/help" style={{ color: 'white' }}>
              Help
            </Link>
          </>
        ) : (
          headerConfig.map(({ link, text }) => (
            <div key={text} className="header__menu-link">
              {pathname.includes(link) && (
                <div className="header__menu-link--active" />
              )}
              <Link to={link}>{text}</Link>
            </div>
          ))
        )}
      </div>
      {isAuth && (
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
          <UiButton
            className={cx(isUserMenuOpened && 'header-icon-active')}
            onclick={toggleMenuVisibility}
            type="icon"
          >
            <UserIcon />
          </UiButton>
          {isUserMenuOpened && (
            <div className="header-menu" ref={ref}>
              {userInfo.fullName && (
                <p className="header-menu__name">{userInfo.fullName}</p>
              )}
              {userInfo.email && (
                <p className="header-menu__name">{userInfo.email}</p>
              )}
              {!isSuperAccount && (
                <Link
                  to="/dashboard/organization#settings"
                  className="header-menu__btn"
                >
                  <SettingsIcon />
                  Settings
                </Link>
              )}
              <button
                type="button"
                className="header-menu__btn"
                onClick={logout}
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
