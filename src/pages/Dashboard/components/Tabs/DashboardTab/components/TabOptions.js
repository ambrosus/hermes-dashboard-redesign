import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import UiButton from '../../../../../../components/UiButton';
import { pushBundle } from '../../../../../../utils/analytisService';

const TabOptions = ({ period = '7d', setPeriod, type = 'asset', setType }) => {
  const { pathname } = useLocation();
  return (
    <div className="dashboard-tab__options">
      <div className="sort-by-type">
        {pathname === '/dashboard/node' && (
          <>
            <UiButton
              onclick={() => pushBundle()}
              priority="primary"
              type="plain"
              styles={{
                backgroundColor: '#4A38AE',
                padding: '0 20px',
                color: '#FFFFFF',
              }}
            >
              Push Bundle
            </UiButton>
            <UiButton
              type="plain"
              onclick={() => setType('bundle')}
              className={cx({ selected: type === 'bundle' })}
            >
              Bundles
            </UiButton>
          </>
        )}
        <UiButton
          type="plain"
          onclick={() => setType('asset')}
          className={cx({ selected: type === 'asset' })}
        >
          Assets
        </UiButton>
        <UiButton
          type="plain"
          onclick={() => setType('event')}
          className={cx({ selected: type === 'event' })}
        >
          Events
        </UiButton>
      </div>
      <div className="sort-by-period">
        <button
          type="button"
          onClick={() => setPeriod('24h')}
          className={cx({ 'selected-period': period === '24h' })}
        >
          Day
        </button>
        <button
          type="button"
          onClick={() => setPeriod('7d')}
          className={cx({ 'selected-period': period === '7d' })}
        >
          Week
        </button>
        <button
          type="button"
          onClick={() => setPeriod('28d')}
          className={cx({ 'selected-period': period === '28d' })}
        >
          Month
        </button>
        <button
          type="button"
          onClick={() => setPeriod('12m')}
          className={cx({ 'selected-period': period === '12m' })}
        >
          Year
        </button>
      </div>
    </div>
  );
};

TabOptions.propTypes = {
  period: PropTypes.string,
  setPeriod: PropTypes.func,
  type: PropTypes.string,
  setType: PropTypes.func,
};

export default TabOptions;
