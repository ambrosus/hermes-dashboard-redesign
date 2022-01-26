import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import UiInput from '../../../../../components/UiInput';
import lockIcon from '../../../../../assets/svg/lock.svg';
import personIcon from '../../../../../assets/svg/person.svg';
import UiButton from '../../../../../components/UiButton';
import {
  getOrganization,
  modifyOrganization,
} from '../../../../../utils/organizationService';
import { isEmptyObj } from '../../../../../utils/isEmptyObj';

const SettingsTab = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [organization, setOrganization] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!isEmptyObj(userInfo)) {
      getOrganization(userInfo.organization).then((org) => {
        setOrganization(org);
      });
    }
  }, [userInfo]);

  const handleSetFormData = (keyValue) => {
    setOrganization({ ...organization, ...keyValue });
    setFormData({ ...formData, ...keyValue });
  };

  const editData = async () => {
    await modifyOrganization(userInfo.organization, formData)
      .then(() =>
        NotificationManager.success('All changes were saved successfully'),
      )
      .catch(() => NotificationManager.error('Error while editing account'));
  };

  return (
    organization !== null && (
      <div className="settings-tab">
        <div className="organization-container__heading">
          My account settings
        </div>
        <div className="settings-tab__secondary">
          <ReactSVG src={personIcon} /> {organization?.title}
        </div>
        <div className="space-25" />
        <div className="settings-tab__switch">
          <div className="buttons">
            <button
              type="button"
              className="active"
              onClick={() => setFormData({ ...formData, active: true })}
            >
              <p>Active</p>
            </button>
            <button
              type="button"
              className="disable"
              onClick={() => setFormData({ ...formData, active: false })}
            >
              <p>Disable</p>
            </button>
          </div>
          <div className="timestamp">
            Created {moment.unix(organization.createdOn).format('DD MMM YYYY')}
          </div>
        </div>
        <div className="space-25" />
        <form className="create-asset-form">
          <UiInput
            disabled
            imgSrc={lockIcon}
            label="Owner"
            placeholder={organization.owner}
          />
          <UiInput
            name="title"
            onChange={handleSetFormData}
            value={organization.title}
            label="Title"
            placeholder={organization.title}
          />
          <UiInput
            name="email"
            onChange={handleSetFormData}
            value={organization.email}
            label="Email"
            placeholder={organization.email}
          />
          <div className="bottom-label">
            <UiButton className="save-account" onclick={editData}>
              Save
            </UiButton>
          </div>
        </form>
      </div>
    )
  );
};

export default SettingsTab;
