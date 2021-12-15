import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StatusBar from './components/StatusBar';
import AccountsList from './components/AccountsList';
import { getOrganizationAccounts } from '../../../../../../utils/organizationService';
import { handleModal } from '../../../../../../store/modules/modal';
import UiButton from '../../../../../../components/UiButton';

const AccountsTab = () => {
  const [display, setDisplay] = useState('all');
  const [accounts, setAccounts] = useState([]);
  const dispatch = useDispatch();

  const openInviteAccountModal = () =>
    dispatch(handleModal('inviteAccountModal'));

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
        <UiButton
          styles={{
            width: 180,
          }}
          className="invite-btn"
          type="primary"
          onclick={openInviteAccountModal}
        >
          Invite
        </UiButton>
      </div>
      <StatusBar type={display} setType={setDisplay} />
      <AccountsList displayAccounts={display} accounts={accounts} />
    </div>
  );
};

export default AccountsTab;
