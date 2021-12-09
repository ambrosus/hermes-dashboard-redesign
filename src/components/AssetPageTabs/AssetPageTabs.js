import React, { useState } from 'react';
import cx from 'classnames';
import EventTab from './EventTab';
import PackageTab from './PackageTab';
import HistoryTab from './HistoryTab';

const tabsBtns = ['events', 'packages', 'history'];

const AssetPageTabs = () => {
  const [currentTab, setCurrentTab] = useState('events');

  const renderTab = () => {
    if (currentTab === 'events') {
      return <EventTab />;
    }
    if (currentTab === 'packages') {
      return <PackageTab />;
    }
    return <HistoryTab />;
  };

  return (
    <div className="asset-page-tabs">
      <div className="container">
        {tabsBtns.map((el) => (
          <button
            key={el}
            className={cx(
              'asset-page-tabs__btn',
              currentTab === el && 'asset-page-tabs__btn--selected',
            )}
            type="button"
            onClick={() => {
              setCurrentTab(el);
            }}
          >
            {el}
          </button>
        ))}
      </div>
      <div className="asset-page-tabs__content">
        <div className="asset-page-tabs__container container">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default AssetPageTabs;
