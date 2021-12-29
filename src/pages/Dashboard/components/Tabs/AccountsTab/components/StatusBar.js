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
          type="plain"
          onclick={() => setType('all')}
          className={cx({ selected: type === 'all' })}
        >
          All
        </UiButton>
        <UiButton
          type="plain"
          onclick={() => setType('active')}
          className={cx({ selected: type === 'active' })}
        >
          Active
        </UiButton>
        <UiButton
          type="plain"
          onclick={() => setType('pending')}
          className={cx({ selected: type === 'pending' })}
        >
          Pending
        </UiButton>
        <UiButton
          type="plain"
          onclick={() => setType('disabled')}
          className={cx({ selected: type === 'disabled' })}
        >
          Disabled
        </UiButton>
        {isNodePage && (
          <UiButton
            type="plain"
            onclick={() => setType('declined')}
            className={cx({ selected: type === 'declined' })}
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
