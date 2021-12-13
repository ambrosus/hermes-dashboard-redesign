import React, { useEffect, useState } from 'react';
import StatusBar from './components/StatusBar';
import AccountsList from './components/AccountsList';
import { getOrganizationAccounts } from '../../../../../../utils/organizationService';

const AccountsTab = () => {
  const [display, setDisplay] = useState('all');
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getOrganizationAccounts().then(({ data }) => setAccounts(data));
  }, [display]);

  return (
    <div className="accounts-tab">
      <div className="accounts-tab__header" style={{ paddingBottom: 44 }}>
        <div
          className="organization-container__heading"
          style={{ paddingBottom: 0 }}
        >
          Accounts
        </div>
        <div className="invite-btn">Invite</div>
      </div>
      <StatusBar type={display} setType={setDisplay} />
      <AccountsList displayAccounts={display} accounts={accounts} />
    </div>
  );
};

export default AccountsTab;
