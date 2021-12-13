import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const StatusBar = ({ type = 'asset', setType }) => (
  <div className="accounts-tab__status-bar">
    <div className="sort-by-type">
      <button
        type="button"
        onClick={() => setType('all')}
        className={cx({ 'selected-type': type === 'all' })}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => setType('active')}
        className={cx({ 'selected-type': type === 'active' })}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => setType('pending')}
        className={cx({ 'selected-type': type === 'pending' })}
      >
        Pending
      </button>
      <button
        type="button"
        onClick={() => setType('disabled')}
        className={cx({ 'selected-type': type === 'disabled' })}
      >
        Disabled
      </button>
    </div>
  </div>
);

StatusBar.propTypes = {
  type: PropTypes.string,
  setType: PropTypes.func,
};

export default StatusBar;
