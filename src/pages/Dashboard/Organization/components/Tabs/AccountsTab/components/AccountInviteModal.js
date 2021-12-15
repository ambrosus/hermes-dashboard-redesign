import React from 'react';
import { useDispatch } from 'react-redux';
import { handleModal } from '../../../../../../../store/modules/modal';
import UiButton from '../../../../../../../components/UiButton';
import UiModal from '../../../../../../../components/UiModal';

const AccountInviteModal = () => {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(handleModal('inviteAccountModal'));

  return (
    <UiModal modalName="inviteAccountModal">
      <div className="form-semicolon-wrapper">
        <UiButton
          onclick={closeModal}
          styles={{ background: '#9198BB', padding: 12 }}
        >
          Cancel
        </UiButton>
        <UiButton styles={{ padding: 12 }}>Create Asset</UiButton>
      </div>
    </UiModal>
  );
};

export default AccountInviteModal;
