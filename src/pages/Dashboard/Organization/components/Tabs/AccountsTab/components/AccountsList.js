import React from 'react';
import * as PropTypes from 'prop-types';
import AccountsListItem from './AccountsListItem';
import { debugLog } from '../../../../../../../utils/debugLog';

const AccountsList = ({ accounts = [], displayAccounts }) => {
  debugLog('accounts', accounts);

  return (
    <div className="accounts-tab__list">
      <div />
      {accounts.map((account) => {
        debugLog(displayAccounts);
        if (displayAccounts === 'all') {
          debugLog('all');
          return <AccountsListItem key={account.address} acc={account} />;
        }
        if (displayAccounts === 'active' && account.active) {
          debugLog('active');
          return <AccountsListItem key={account.address} acc={account} />;
        }
        if (displayAccounts === 'pending' && account.pending) {
          debugLog('pending');
          return <AccountsListItem key={account.address} acc={account} />;
        }
        if (displayAccounts === 'disabled' && account.disabled) {
          debugLog('disabled');
          return <AccountsListItem key={account.address} acc={account} />;
        }
        return false;
      })}
    </div>
  );
};

AccountsList.propTypes = {
  displayAccounts: PropTypes.string,
  accounts: PropTypes.array,
};

export default React.memo(AccountsList);
