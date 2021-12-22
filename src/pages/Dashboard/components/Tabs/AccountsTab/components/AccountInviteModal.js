import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleModal } from '../../../../../../store/modules/modal';
import { createInvites } from '../../../../../../utils/organizationService';
import UiButton from '../../../../../../components/UiButton';
import UiModal from '../../../../../../components/UiModal';
import UiInput from '../../../../../../components/UiInput';
import addIcon from '../../../../../../assets/svg/add-icon.svg';

const AccountInviteModal = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const closeModal = () => dispatch(handleModal({ name: null }));

  const sendInviteHandler = async () => {
    await createInvites({ email: [`${email}`] });
  };
  return (
    <UiModal
      modalName="inviteAccountModal"
      contentStyles={{ height: 'max-content' }}
    >
      <div className="account-invite-modal">
        <div className="account-invite-modal__header">
          <h2 className="account-invite-modal__header--heading">
            Invite Members
          </h2>
          <button
            className="account-invite-modal__header--form"
            type="button"
            onClick={() => alert('formHandler()')}
          >
            Form
          </button>
        </div>
        <div className="space-25" />
        <UiInput
          label="Email"
          placeholder="Asset name for example"
          onChange={(e) => setEmail(e)}
        />
        <div className="space-10" />
        <button
          onClick={() => alert('addPropertiesHandler()')}
          type="button"
          className="add-form-item-btn"
        >
          <img src={addIcon} alt="add icon" />
          Add properties
        </button>
        <div className="space-10" />
        <div className="space-10" />
        <div className="space-25" />

        <div className="btn-group">
          <UiButton
            onclick={closeModal}
            styles={{ background: '#9198BB', padding: 12 }}
          >
            Cancel
          </UiButton>
          <UiButton
            onclick={sendInviteHandler}
            styles={{ background: '#4A38AE', padding: 12 }}
          >
            Invite
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
};

export default AccountInviteModal;
