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
              setAccounts(data);
            }
          })
        : fetchOrganizations(),
    [display],
  );

  const fetchOrganizations = () => {
    getOrganizations().then((data) => {
      if (data) setAccounts(data);
    });
  };

  function getFileHandler() {
    const inputFile = document.getElementById('selectedFile');
    inputFile.addEventListener('change', getFile);
    inputFile.click();
  }

  const handleAccounts = (id, isActive) => {
    const accountsKey = isActive ? 'disabled' : 'active';

    setAccounts((state) => ({
      ...state,
      [accountsKey]: state[accountsKey].filter(
        ({ organizationId }) => organizationId !== id,
      ),
      all: state.all.map((el) => {
        if (el.organizationId === id) {
          return {
            ...el,
            active: isActive,
          };
        }
        return el;
      }),
    }));
  };

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
            <UiButton
              onclick={() => getFileHandler()}
              styles={{ fontSize: 12 }}
            >
              Restore
            </UiButton>
          )}
        </div>
      </div>

      <div className="space-25" />

      {accounts?.all.length > 0 ? (
        <AccountsList
          handleAccounts={handleAccounts}
          displayAccounts={display}
          accounts={accounts && accounts}
          fetchOrganizations={fetchOrganizations}
        />
      ) : (
        <progress
          style={{
            width: '100%',
            height: 20,
          }}
        />
      )}
      <AccountInviteModal />
    </div>
  );
};

export default AccountsTab;
