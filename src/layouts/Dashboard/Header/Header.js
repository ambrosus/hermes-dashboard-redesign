import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import logoIcon from '../../../assets/svg/logo.svg';
import { ReactComponent as SearchIcon } from '../../../assets/svg/search.svg';
import { ReactComponent as UserIcon } from '../../../assets/svg/person.svg';
import UiButton from '../../../components/UiButton';
import { handleModal } from '../../../store/modules/modal';

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const openedModalName = useSelector((state) => state.modal.openedModal.name);

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
        <UiButton type="icon">
          <UserIcon />
        </UiButton>
      </div>
    </header>
  );
};

export default Header;
