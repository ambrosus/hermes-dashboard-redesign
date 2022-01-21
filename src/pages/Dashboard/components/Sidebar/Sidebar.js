import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import PropTypes from 'prop-types';
/*eslint-disable*/
import cx from 'classnames';

const Sidebar = ({ setActiveTab, menuStructure }) => {
  const [activeMenuTab, setActiveMenuTab] = useState(
    () => window.location.hash.replace('#', '') || menuStructure[0].tabIdentifier,
  );
  const setActiveMenuHandler = (tabName) => {
    setActiveMenuTab(tabName);
    setActiveTab(tabName);
  };
  return (
    <div className="organization-sidebar">
      {menuStructure.map(({ tabIdentifier, name, icon }) => {
        return (
          <div
            key={tabIdentifier}
            role="presentation"
            className={cx('organization-sidebar__item', {
              'organization-sidebar__item-active':
                activeMenuTab === tabIdentifier,
            })}
            onClick={() => setActiveMenuHandler(tabIdentifier)}
          >
            <ReactSVG
              className={cx('svg', {
                'svg-active': activeMenuTab === tabIdentifier,
              })}
              src={icon}
            />{' '}
            {name}
          </div>
        );
      })}
    </div>
  );
};

Sidebar.propTypes = {
  setActiveTab: PropTypes.func,
};
export default Sidebar;
