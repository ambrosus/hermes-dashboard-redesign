import React, { useEffect, useState } from 'react';
import moment from 'moment';
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
        setFormData({
          title: org.title,
          fullName: org.fullName,
        });
      });
    }
  }, [userInfo]);

  const handleSetFormData = (keyValue) => {
    setFormData({ ...formData, ...keyValue });
  };

  const editData = async () => {
    const { title, legalAddress } = formData;
    await modifyOrganization(userInfo.organization, {
      ...(formData.title !== organization.title && { title }),
      ...(formData.fullName !== organization.fullName && {
        legalAddress,
      }),
    });
  };

  const handleDisable = async () => {
    await modifyOrganization(userInfo.organization, { active: false });

    sessionStorage.removeItem('user_private_key');
    sessionStorage.removeItem('user_account');
    localStorage.removeItem('createAssetData');

    window.location.reload();
  };

  const isDisabled =
    formData.title === organization.title &&
    formData.fullName === organization.fullName;

  return (
    <div className="settings-tab">
      <div className="organization-container__heading">My account settings</div>
      <div className="settings-tab__secondary">
        <ReactSVG src={personIcon} /> {organization.title}
      </div>
      <div className="space-25" />
      <div className="settings-tab__switch">
        <div className="buttons">
          <button type="button" className="disable" onClick={handleDisable}>
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
          value={formData.title}
          label="Title"
          placeholder={organization.title}
        />
        <UiInput
          name="fullName"
          onChange={handleSetFormData}
          value={formData.fullName}
          label="Full name"
          placeholder={organization.fullName}
        />
        <div className="bottom-label">
          <UiButton
            className="save-account"
            disabled={isDisabled}
            onclick={editData}
          >
            Save
          </UiButton>
        </div>
      </form>
    </div>
  );
};

export default SettingsTab;
