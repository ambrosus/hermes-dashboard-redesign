import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StatusBar from './components/StatusBar';
import AccountsList from './components/AccountsList';
import {
  getFile,
  getOrganizationAccounts,
  getOrganizations,
} from '../../../../../utils/organizationService';
import { handleModal } from '../../../../../store/modules/modal';
import UiButton from '../../../../../components/UiButton';
import AccountInviteModal from './components/AccountInviteModal';

const AccountsTab = () => {
  const [display, setDisplay] = useState('all');
  const [accounts, setAccounts] = useState({
    all: [],
    active: [],
    pending: [],
    disabled: [],
  });
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isNodePage = pathname === '/dashboard/node';

  const openInviteAccountModal = () =>
    dispatch(handleModal({ name: 'inviteAccountModal' }));

  useEffect(
    () =>
      !isNodePage
        ? getOrganizationAccounts(
            JSON.parse(sessionStorage.getItem('user_account')).organization,
          ).then((data) => {
            if (data) {
              console.log('[ACCOUNT TAB] getOrganizationAccounts', data);
              setAccounts(data);
            }
          })
        : getOrganizations().then((data) => {
            if (data) {
              console.log('[ACCOUNT TAB] getOrganizations', data);
              setAccounts(data);
            }
          }),
    [display],
  );

  function getFileHandler() {
    const inputFile = document.getElementById('selectedFile');
    inputFile.addEventListener('change', getFile);
    inputFile.click();
  }

  return (
    <div className="accounts-tab">
      <div className="accounts-tab__header" style={{ paddingBottom: 44 }}>
        <div
          className="organization-container__heading"
          style={{ paddingBottom: 0 }}
        >
          {!isNodePage ? 'Accounts' : 'Organizations'}
        </div>
        {!isNodePage && (
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
        )}
      </div>
      <div className="flex-row flex justify-content-space-between align-items-center">
        <StatusBar type={display} setType={setDisplay} />
        <div className="flex align-items-center">
          <input type="file" id="selectedFile" />
          {isNodePage && (
            <UiButton onclick={() => getFileHandler()}>Restore</UiButton>
          )}
        </div>
      </div>

      <div className="space-25" />
      <AccountsList displayAccounts={display} accounts={accounts && accounts} />
      <AccountInviteModal />
    </div>
  );
};

export default AccountsTab;
