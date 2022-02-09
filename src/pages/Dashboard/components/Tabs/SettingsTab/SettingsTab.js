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
  modifyAccount,
  modifyOrganization,
} from '../../../../../utils/organizationService';
import { isEmptyObj } from '../../../../../utils/isEmptyObj';
import eyeIcon from '../../../../../assets/svg/eye.svg';

const SettingsTab = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [organization, setOrganization] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfVisible, setIsPasswordConfVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!isEmptyObj(userInfo)) {
      getOrganization(userInfo.organization).then((org) => {
        setOrganization(org);
        setFormData({ email: userInfo.email });
      });
    }
  }, [userInfo]);

  const handleSetFormData = (keyValue) => {
    setFormData({ ...formData, ...keyValue });
  };

  const editData = async () => {
    const { email } = formData;
    await modifyAccount(userInfo.address, {
      ...(formData.password && {
        token: btoa(
          JSON.stringify(
            window.web3.eth.accounts.encrypt(
              sessionStorage.getItem('user_private_key'),
              formData.password,
            ),
          ),
        ),
      }),
      ...(formData.email !== organization.email && { email }),
    });
  };

  const handleDisable = async () => {
    await modifyOrganization(userInfo.organization, { active: false });

    sessionStorage.removeItem('user_private_key');
    sessionStorage.removeItem('user_account');
    localStorage.removeItem('createAssetData');

    window.location.reload();
  };

  const handlePasswordVisible = () => setIsPasswordVisible((state) => !state);
  const handlePasswordConfVisible = () =>
    setIsPasswordConfVisible((state) => !state);

  const passwordPattern = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}))/;

  const isPasswordMatch = !passwordPattern.test(formData.password);
  const isConfirmMatch = formData.password !== formData.confirmPassword;

  const isDisabled =
    formData.email === userInfo.email &&
    (!(!isConfirmMatch && formData.confirmPassword) || isPasswordMatch);

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
          <span style={{ fontWeight: 700, marginRight: 4 }}>Created</span>
          {moment.unix(organization.createdOn).format('DD MMM YYYY')}
        </div>
      </div>
      <div className="space-25" />
      <form className="create-asset-form">
        <UiInput
          disabled
          imgSrc={lockIcon}
          label="Owner"
          placeholder={organization.owner}
          className="settings-tab__owner"
        />
        <UiInput
          name="email"
          onChange={handleSetFormData}
          value={formData.email}
          label="Email"
          placeholder={organization.email}
        />
        <UiInput
          name="password"
          onChange={handleSetFormData}
          value={formData.password}
          label="Password"
          imgSrc={eyeIcon}
          onImageClick={handlePasswordVisible}
          type={isPasswordVisible ? 'text' : 'password'}
        />
        {formData.password && isPasswordMatch && (
          <span className="error-message">
            Password is weak. Use at least 8 characters, one lowercase, one
            uppercase letter and a number.
          </span>
        )}
        <UiInput
          name="confirmPassword"
          onChange={handleSetFormData}
          value={formData.confirmPassword}
          label="Confirm password"
          imgSrc={eyeIcon}
          onImageClick={handlePasswordConfVisible}
          type={isPasswordConfVisible ? 'text' : 'password'}
        />
        {formData.confirmPassword && isConfirmMatch && (
          <span className="error-message">Passwords do not match</span>
        )}
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
