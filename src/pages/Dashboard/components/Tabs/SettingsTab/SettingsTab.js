import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import UiInput from '../../../../../components/UiInput';
import lockIcon from '../../../../../assets/svg/lock.svg';
import personIcon from '../../../../../assets/svg/person.svg';
import UiButton from '../../../../../components/UiButton';

const SettingsTab = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: userInfo.fullName || '',
    email: userInfo.email || '',
  });

  const handleSetFormData = (keyValue) => {
    setFormData({ ...formData, ...keyValue });
  };

  const editData = () => {
    axios
      .post(
        `https://vitalii427-hermes.ambrosus-test.io/account2/modify/${userInfo.address}`,
        formData,
      )
      .then(() =>
        NotificationManager.success('All changes were saved successfully'),
      )
      .catch(() => NotificationManager.error('Error while editing account'));
  };

  return (
    <div className="settings-tab">
      <div className="organization-container__heading">My account settings</div>
      <div className="settings-tab__secondary">
        <ReactSVG src={personIcon} /> {userInfo.fullName || 'Name'}
      </div>
      <div className="space-25" />
      <div className="settings-tab__switch">
        <div className="buttons">
          <button type="button" className="active">
            <p>Active</p>
          </button>
          <button type="button" className="disable">
            <p>Disable</p>
          </button>
        </div>
        <div className="timestamp">
          Created {moment.unix(userInfo.createdOn).format('DD.MM.YYYY')}
        </div>
      </div>
      <div className="space-25" />
      <form className="create-asset-form">
        <UiInput
          disabled
          imgSrc={lockIcon}
          label="Owner"
          placeholder={userInfo.address}
        />
        <UiInput
          name="fullName"
          onChange={handleSetFormData}
          value={formData.fullName}
          label="Title"
          placeholder="Account random name "
        />
        <UiInput
          name="email"
          onChange={handleSetFormData}
          value={formData.email}
          label="Email"
          placeholder="Email"
        />
        <div className="bottom-label">
          <UiButton className="save-account" onclick={editData}>
            Save
          </UiButton>
        </div>
      </form>
    </div>
  );
};

export default SettingsTab;
