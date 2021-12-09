import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';
import cx from 'classnames';
import diagramIcon from '../../../../../assets/svg/leaderboard.svg';
import accountIcon from '../../../../../assets/svg/people.svg';
import settingsIcon from '../../../../../assets/svg/settings.svg';

const Sidebar = (props) => {
  const [activeMenuTab, setActiveMenuTab] = useState('DASHBOARD_TAB');
  const setActiveMenuHandler = (tabName) => {
    setActiveMenuTab(tabName);
    props.setActiveTab(tabName);
  };
  return (
    <div className="organization-sidebar">
      <div
        role="presentation"
        className="organization-sidebar__item"
        onClick={() => setActiveMenuHandler('DASHBOARD_TAB')}
      >
        <ReactSVG
          className={cx('svg', {
            'svg-active': activeMenuTab === 'DASHBOARD_TAB',
          })}
          src={diagramIcon}
        />{' '}
        Dashboard
      </div>
      <div
        role="presentation"
        className="organization-sidebar__item"
        onClick={() => setActiveMenuHandler('ACCOUNTS_TAB')}
      >
        <ReactSVG
          className={cx('svg', {
            'svg-active': activeMenuTab === 'ACCOUNTS_TAB',
          })}
          src={accountIcon}
        />{' '}
        Accounts
      </div>
      <div
        role="presentation"
        className="organization-sidebar__item"
        onClick={() => setActiveMenuHandler('SETTINGS_TAB')}
      >
        <ReactSVG
          className={cx('svg', {
            'svg-active': activeMenuTab === 'SETTINGS_TAB',
          })}
          src={settingsIcon}
        />{' '}
        Settings
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setActiveTab: PropTypes.func,
};
export default Sidebar;
