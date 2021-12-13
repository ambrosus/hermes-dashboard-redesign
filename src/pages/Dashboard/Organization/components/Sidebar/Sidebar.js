import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';
import cx from 'classnames';
import diagramIcon from '../../../../../assets/svg/leaderboard.svg';
import accountIcon from '../../../../../assets/svg/people.svg';
import settingsIcon from '../../../../../assets/svg/settings.svg';
import {
  ACCOUNTS_TAB,
  DASHBOARD_TAB,
  SETTINGS_TAB,
} from '../../../../../config';

const Sidebar = (props) => {
  const [activeMenuTab, setActiveMenuTab] = useState(DASHBOARD_TAB);
  const setActiveMenuHandler = (tabName) => {
    setActiveMenuTab(tabName);
    props.setActiveTab(tabName);
  };
  return (
    <div className="organization-sidebar">
      <div
        role="presentation"
        className={cx('organization-sidebar__item', {
          'organization-sidebar__item-active': activeMenuTab === DASHBOARD_TAB,
        })}
        onClick={() => setActiveMenuHandler(DASHBOARD_TAB)}
      >
        <ReactSVG
          className={cx('svg', {
            'svg-active': activeMenuTab === DASHBOARD_TAB,
          })}
          src={diagramIcon}
        />{' '}
        Dashboard
      </div>
      <div
        role="presentation"
        className={cx('organization-sidebar__item', {
          'organization-sidebar__item-active': activeMenuTab === ACCOUNTS_TAB,
        })}
        onClick={() => setActiveMenuHandler(ACCOUNTS_TAB)}
      >
        <ReactSVG
          className={cx('svg', {
            'svg-active': activeMenuTab === ACCOUNTS_TAB,
          })}
          src={accountIcon}
        />{' '}
        Accounts
      </div>
      <div
        role="presentation"
        className={cx('organization-sidebar__item', {
          'organization-sidebar__item-active': activeMenuTab === SETTINGS_TAB,
        })}
        onClick={() => setActiveMenuHandler(SETTINGS_TAB)}
      >
        <ReactSVG
          className={cx('svg', {
            'svg-active': activeMenuTab === SETTINGS_TAB,
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
