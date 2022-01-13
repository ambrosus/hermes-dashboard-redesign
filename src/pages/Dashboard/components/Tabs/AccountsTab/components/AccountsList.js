import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import AccountsListItem from './AccountsListItem';
import UiButton from '../../../../../../components/UiButton';
import UiModal from '../../../../../../components/UiModal';
import { handleModal } from '../../../../../../store/modules/modal';

const AccountsList = ({
  accounts = [],
  displayAccounts,
  handleAccounts,
  fetchOrganizations,
}) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.modal.openedModal);

  const closeModal = () => dispatch(handleModal({ name: '' }));

  return (
    <div className="accounts-tab__list">
      {accounts[displayAccounts] &&
        accounts[displayAccounts].map((item) => (
          <AccountsListItem
            handleAccounts={handleAccounts}
            type={displayAccounts}
            // eslint-disable-next-line no-underscore-dangle
            key={item._id}
            info={item}
            fetchOrganizations={fetchOrganizations}
          />
        ))}
      <UiModal modalName="deleteAccount">
        <div className="delete-account-modal">
          <p>You sure you want to disable account?</p>
          <UiButton type="secondary" onclick={closeModal}>
            Cancel
          </UiButton>
          <UiButton type="primary" onclick={() => data()}>
            Disable
          </UiButton>
        </div>
      </UiModal>
    </div>
  );
};

AccountsList.propTypes = {
  displayAccounts: PropTypes.string,
  accounts: PropTypes.object,
  handleAccounts: PropTypes.func,
  fetchOrganizations: PropTypes.func,
};

export default React.memo(AccountsList);
