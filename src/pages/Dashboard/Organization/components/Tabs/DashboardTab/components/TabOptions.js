import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
const TabOptions = ({ period = '7d', setPeriod }) => (
  <div className="dashboard-tab__options">
    <div />
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

TabOptions.propTypes = {
  period: PropTypes.string,
  setPeriod: PropTypes.func,
};

export default TabOptions;
