import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StatusBar from './components/StatusBar';
import AccountsList from './components/AccountsList';
import {
  getOrganizationAccounts,
  getOrganizations,
} from '../../../../../utils/organizationService';
import { handleModal } from '../../../../../store/modules/modal';
import UiButton from '../../../../../components/UiButton';
import AccountInviteModal from './components/AccountInviteModal';

const AccountsTab = () => {
  const [display, setDisplay] = useState('all');
  const [accounts, setAccounts] = useState([]);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isNodePage = pathname === '/dashboard/node';

  const openInviteAccountModal = () =>
    dispatch(handleModal({ name: 'inviteAccountModal' }));

  useEffect(
    () =>
      !isNodePage
        ? getOrganizationAccounts().then(({ data }) => {
            if (data) {
              console.log(data);
              setAccounts(data);
            }
          })
        : getOrganizations().then(({ data }) => {
            if (data) {
              console.log(data);
              setAccounts(data);
            }
          }),
    [display],
  );

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
      <AccountsList isNodePage displayAccounts={display} accounts={accounts} />
      <AccountInviteModal />
    </div>
  );
};

export default AccountsTab;
