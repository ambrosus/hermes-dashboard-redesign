import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import MemberDetailsModal from './components/MemberDetailsModal';

const AccountsTab = () => {
  const { data: modalData, name } = useSelector(
    (state) => state.modal.openedModal,
  );

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
    () => (!isNodePage ? fetchAccounts() : fetchOrganizations()),
    [display],
  );

  const fetchAccounts = () => {
    getOrganizationAccounts(
      JSON.parse(sessionStorage.getItem('user_account')).organization,
    ).then((data) => {
      if (data) {
        setAccounts(data);
      }
    });
  };

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

  const handleAccounts = (id, isActive, isAccountEdit) => {
    const accountsKey = isActive ? 'disabled' : 'active';

    setAccounts((state) => ({
      ...state,
      [accountsKey]: state[accountsKey].filter(
        (el) => el[isAccountEdit ? 'address' : 'organizationId'] !== id,
      ),
      all: state.all.map((el) => {
        if (el[isAccountEdit ? 'address' : 'organizationId'] === id) {
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
          {isNodePage && false && (
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

      {accounts.all.length > 0 ? (
        <AccountsList
          handleAccounts={handleAccounts}
          displayAccounts={display}
          accounts={accounts && accounts}
          fetchOrganizations={fetchOrganizations}
          fetchAccounts={fetchAccounts}
        />
      ) : (
        <div
          className="loader"
          style={{ display: 'block', margin: '0 auto' }}
        />
      )}
      <AccountInviteModal fetchAccounts={fetchAccounts} />
      {name === 'memberDetailsModal' && modalData && (
        <MemberDetailsModal
          handleUserActive={handleAccounts}
          fetchAccounts={fetchAccounts}
          fetchOrganizations={fetchOrganizations}
        />
      )}
    </div>
  );
};

export default AccountsTab;
