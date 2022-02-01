import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { handleModal } from '../../../../../../store/modules/modal';
import { createInvites } from '../../../../../../utils/organizationService';
import UiButton from '../../../../../../components/UiButton';
import UiModal from '../../../../../../components/UiModal';
import UiInput from '../../../../../../components/UiInput';
import addIcon from '../../../../../../assets/svg/add-icon.svg';
import closeFillIcon from '../../../../../../assets/svg/close-filled.svg';

const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const AccountInviteModal = ({ fetchAccounts }) => {
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

  const sendInviteHandler = () => {
    createInvites({ email: Array.isArray(email) ? email : [email] }, () => {
      dispatch(handleModal({ name: '' }));
      fetchAccounts();
    });
  };

  const handleEmailClose = (idx) => {
    setEmail((array) => {
      const clone = [...array];
      clone.splice(idx, 1);
      return clone;
    });
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
          <>
            <UiInput
              /* eslint-disable-next-line react/no-array-index-key */
              key={idx}
              label="Email"
              placeholder="Asset name for example"
              onChange={(e) => handleEmail(e, idx)}
              value={el}
              imgSrc={idx === 0 ? '' : closeFillIcon}
              onImageClick={idx === 0 ? null : () => handleEmailClose(idx)}
            />
            {el && !mailFormat.test(el) && (
              <span className="error-message">Incorrect email</span>
            )}
          </>
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
          <UiButton
            type="primary"
            onclick={sendInviteHandler}
            disabled={email.some((el) => !mailFormat.test(el))}
          >
            Invite
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
};

AccountInviteModal.propTypes = {
  fetchAccounts: PropTypes.func,
};

export default AccountInviteModal;
