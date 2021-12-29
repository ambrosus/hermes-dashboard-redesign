import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import EventTab from './EventTab';
import PackageTab from './PackageTab';
import HistoryTab from './HistoryTab';

const tabsBtns = ['events'];

const AssetPageTabs = ({ assetId }) => {
  const [currentTab, setCurrentTab] = useState('events');

  const renderTab = () => {
    if (currentTab === 'events') {
      return <EventTab assetId={assetId} />;
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

AssetPageTabs.propTypes = {
  assetId: PropTypes.string,
};

export default AssetPageTabs;
