import React from 'react';
import * as PropTypes from 'prop-types';
import AccountsListItem from './AccountsListItem';
/*eslint-disable*/
const AccountsList = ({ accounts = [], displayAccounts }) => {
  return (
    <div className="accounts-tab__list">
      {displayAccounts === 'all' &&
        accounts.all &&
        accounts.all.map((item) => (
          <AccountsListItem type={displayAccounts} key={item._id} acc={item} />
        ))}
      {displayAccounts === 'active' &&
        accounts.active &&
        accounts.active.map((item) => (
          <AccountsListItem type={displayAccounts} key={item._id} acc={item} />
        ))}
      {displayAccounts === 'pending' &&
        accounts.pending &&
        accounts.pending.map((item) => (
          <AccountsListItem type={displayAccounts} key={item._id} acc={item} />
        ))}
      {displayAccounts === 'disabled' &&
        accounts.disabled &&
        accounts.disabled.map((item) => (
          <AccountsListItem type={displayAccounts} key={item._id} acc={item} />
        ))}
      {displayAccounts === 'declined' &&
        accounts.declined &&
        accounts.declined.map((item) => (
          <AccountsListItem type={displayAccounts} key={item._id} acc={item} />
        ))}
    </div>
  );
};

AccountsList.propTypes = {
  displayAccounts: PropTypes.string,
  accounts: PropTypes.object,
};

export default React.memo(AccountsList);
