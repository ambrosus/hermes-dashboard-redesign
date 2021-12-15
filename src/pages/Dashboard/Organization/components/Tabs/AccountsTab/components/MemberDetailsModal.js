import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { handleModal } from '../../../../../../../store/modules/modal';
import UiButton from '../../../../../../../components/UiButton';
import UiModal from '../../../../../../../components/UiModal';
import UiInput from '../../../../../../../components/UiInput';
import lockIcon from '../../../../../../../assets/svg/lock.svg';
import UiSelect from '../../../../../../../components/UiSelect';

const MemberDetailsModal = ({ accountInfo }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: '',
  });
  const closeModal = () => dispatch(handleModal({ name: null }));

  const handleSetFormData = (keyValue) => {
    setFormData({
      ...formData,
      ...keyValue,
    });
  };

  return (
    <UiModal
      modalName="memberDetailsModal"
      contentStyles={{ height: 'max-content' }}
    >
      <div className="member-details-modal">
        <div className="member-details-modal__header">
          <h2 className="heading">Member details</h2>
        </div>
        <div className="space-25" />
        <div className="account-detail-header">
          <div className="top">
            <div className="top__name">{accountInfo.email}</div>
          </div>
          <div className="space-10" />
          <div className="options">
            <p className="options__text">
              {' '}
              <span className="key">Key&nbsp; &nbsp; </span>
              <span>{accountInfo.address}</span>
            </p>
            <div className="createdAt">
              <span className="created">Created</span> 11 Aug 2021
            </div>
          </div>
          <div className="space-10" />
          <div className="buttons-options">
            <button
              type="button"
              className="buttons-options--active"
              onClick={() => alert('Activate????')}
            >
              <p>Active</p>
            </button>
            <button type="button" onClick={() => alert('Disabled???')}>
              <p>Disable</p>
            </button>
          </div>
        </div>
        <div className="space-25" />
        <UiInput
          imgSrc={lockIcon}
          label="Public key"
          placeholder="0x9B8c4E354aE59699246864aCbe1e4963C5d9A26B"
        />
        <UiInput label="Name" placeholder="Michelle Antossuare" />
        <div className="form-semicolon-wrapper">
          <UiInput label="Email" placeholder={accountInfo.email} />

          <UiSelect
            options={[
              { value: '1', label: 'GTM' },
              { value: '2', label: 'GTM +2' },
              { value: '3', label: 'GTM +3' },
            ]}
            label="Time zone"
            name="Time zone"
            onChange={handleSetFormData}
            selectedValue={formData.type}
          />
        </div>
        <hr />
        <div className="btn-group">
          <UiButton
            onclick={closeModal}
            styles={{ background: '#9198BB', padding: 12 }}
          >
            Cancel
          </UiButton>
          <UiButton
            onclick={() => alert('saveDatHandler(')}
            styles={{ background: '#4A38AE', padding: 12 }}
          >
            Save
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
};

MemberDetailsModal.propTypes = {
  accountInfo: PropTypes.object,
};
export default MemberDetailsModal;
