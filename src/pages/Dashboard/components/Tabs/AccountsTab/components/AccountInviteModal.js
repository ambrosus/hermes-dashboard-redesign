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
  const [email, setEmail] = useState(['']);

  const closeModal = () => dispatch(handleModal({ name: null }));

  const handleEmail = (value, idx) => {
    const clone = [...email];
    if (typeof email[idx] === 'string') {
      clone[idx] = value;
    } else {
      clone.push(value);
    }
    setEmail(clone);
  };

  const addInvite = () => {
    setEmail([...email, '']);
  };

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
        </div>
        <div className="space-25" />
        {email.map((el, idx) => (
          <UiInput
            /* eslint-disable-next-line react/no-array-index-key */
            key={idx}
            label="Email"
            placeholder="Asset name for example"
            onChange={(e) => handleEmail(e, idx)}
            value={el}
          />
        ))}
        <div className="space-10" />
        <button onClick={addInvite} type="button" className="add-form-item-btn">
          <img src={addIcon} alt="add icon" />
          Add invite
        </button>
        <div className="space-10" />
        <div className="space-10" />
        <div className="space-25" />

        <div className="btn-group">
          <UiButton type="secondary" onclick={closeModal}>
            Cancel
          </UiButton>
          <UiButton type="primary" onclick={sendInviteHandler}>
            Invite
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
};

export default AccountInviteModal;
