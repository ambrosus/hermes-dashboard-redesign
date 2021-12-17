import React from 'react';
import { useLocation } from 'react-router-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import UiButton from '../../../../../../components/UiButton';

const StatusBar = ({ type = 'asset', setType }) => {
  const { pathname } = useLocation();
  const isNodePage = pathname === '/dashboard/node';

  return (
    <div className="accounts-tab__status-bar">
      <div className="sort-by-type">
        <UiButton
          onclick={() => setType('all')}
          className={cx({ 'selected-type': type === 'all' })}
        >
          All
        </UiButton>
        <UiButton
          onclick={() => setType('active')}
          className={cx({ 'selected-type': type === 'active' })}
        >
          Active
        </UiButton>
        <UiButton
          onclick={() => setType('pending')}
          className={cx({ 'selected-type': type === 'pending' })}
        >
          Pending
        </UiButton>
        <UiButton
          onclick={() => setType('disabled')}
          className={cx({ 'selected-type': type === 'disabled' })}
        >
          Disabled
        </UiButton>
        {isNodePage && (
          <UiButton
            onclick={() => setType('declined')}
            className={cx({ 'selected-type': type === 'declined' })}
          >
            Declined
          </UiButton>
        )}
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  type: PropTypes.string,
  setType: PropTypes.func,
};

export default StatusBar;
