import React from 'react';
import * as PropTypes from 'prop-types';
import AccountsListItem from './AccountsListItem';

const AccountsList = ({ accounts = [], displayAccounts }) => {
  console.log('accounts', accounts);

  return (
    <div className="accounts-tab__list">
      <div />
      {accounts.map((account) => {
        console.log(displayAccounts);
        if (displayAccounts === 'all') {
          console.log('all');
          return <AccountsListItem key={account.address} acc={account} />;
        }
        if (displayAccounts === 'active' && account.active) {
          console.log('active');
          return <AccountsListItem key={account.address} acc={account} />;
        }
        if (displayAccounts === 'pending' && account.pending) {
          console.log('pending');
          return <AccountsListItem key={account.address} acc={account} />;
        }
        if (displayAccounts === 'disabled' && account.disabled) {
          console.log('disabled');
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
