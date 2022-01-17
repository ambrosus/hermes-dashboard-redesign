import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { handleModal } from '../../../../../../store/modules/modal';
import UiButton from '../../../../../../components/UiButton';
import UiModal from '../../../../../../components/UiModal';
import UiInput from '../../../../../../components/UiInput';
import lockIcon from '../../../../../../assets/svg/lock.svg';
import UiSelect from '../../../../../../components/UiSelect';
import AuthCheckbox from '../../../../../../components/auth/AuthCheckbox';
import {
  backupJSON,
  modifyAccount,
  modifyOrganization,
} from '../../../../../../utils/organizationService';
/*eslint-disable*/

const permissionsArray = [
  {
    label: 'Super account',
    key: 'super_account',
  },
  {
    label: 'Manage accounts',
    key: 'manage_accounts',
  },
  {
    label: 'Register accounts',
    key: 'register_accounts',
  },
  {
    label: 'Create assets',
    key: 'create_asset',
  },
  {
    label: 'Create events',
    key: 'create_event',
  },
];

const MemberDetailsModal = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isNodePage = pathname === '/dashboard/node';
  const { accessLevel, permissions } = useSelector(
    (state) => state.auth.userInfo,
  );
  const modalData = useSelector((state) => state.modal.openedModal.data);
  const [userPermissions, setUserPermissions] = useState(permissions);
  const [userAccessLevel, setUserAccessLevel] = useState(accessLevel);
  const [modifyOrg, setModifyOrg] = useState({});
  const [modifyAcc, setModifyAcc] = useState({});
  const [formData, setFormData] = useState({
    type: '',
  });

  const handleCheckbox = useCallback(
    (isChecked, permissionKey) => {
      if (!isChecked) {
        setUserPermissions(() =>
          userPermissions.filter((el) => el !== permissionKey),
        );
      } else {
        setUserPermissions(() => [...userPermissions, permissionKey]);
      }
    },
    [userPermissions, setUserPermissions],
  );
  useEffect(() => {
    if (userPermissions) {
      modifyAccount(modalData?.address, { permissions: userPermissions });
      console.log({ permissions: userPermissions });
    }
  }, [userPermissions]);

  const handleSetFormData = (keyValue) => {
    setFormData({
      ...formData,
      ...keyValue,
    });
  };

  const closeModal = () => dispatch(handleModal({ name: null }));

  const organisationBackupHandler = async (...args) => {
    const { id } = args[0][0];
    try {
      await backupJSON(id);
    } catch (error) {
      console.error('[BACKUP] Organization: ', error);
    }
  };
  const modifyOrganizationHandler = async (...args) => {
    const { id, data } = args[0];
    try {
      console.log('modify');
      await modifyOrganization(id, data);
      alert('Organization modified');
    } catch (error) {
      console.error('[MODIFY] Organization: ', error);
      alert(error);
    }
  };

  const modifyAccountHandler = async (...args) => {
    const { address, data } = args[0];
    try {
      await modifyAccount(address, data);
      console.log('Account modified');
    } catch (error) {
      console.error('[MODIFY] Account: ', error);
    }
  };

  const saveHandler = async () => {
    isNodePage
      ? await modifyOrganization(modalData.organizationId, modifyOrg)
      : await modifyAccount(modalData?.address, modifyAcc);
    console.log({
      ...modifyAcc,
    });
  };

  const handleModifyOrg = (keyValue) => {
    setModifyOrg({ ...modifyOrg, ...keyValue });
  };

  function handleModifyAccount(keyValue) {
    setModifyAcc({ ...modifyAcc, ...keyValue });
    console.log({ ...modifyAcc, ...keyValue });
  }

  return (
    <UiModal
      modalName="memberDetailsModal"
      contentStyles={{ height: 'max-content' }}
    >
      <div className="member-details-modal">
        <div className="member-details-modal__header">
          <h2 className="heading">
            {!isNodePage ? 'Member details' : 'Organization details'}
          </h2>
        </div>
        <div className="space-25" />
        <div className="account-detail-header">
          <div className="top">
            <div className="top__name">
              {!isNodePage ? modalData?.email : modalData?.title}
            </div>
          </div>
          <div className="space-10" />
          <div className="options">
            <p className="options__text">
              {' '}
              <span className="key">
                {!isNodePage ? 'Key' : 'Owner'} &nbsp; &nbsp;
              </span>
              <span>{!isNodePage ? modalData?.address : modalData?.owner}</span>
            </p>
            {!isNodePage && (
              <div className="createdAt">
                <span className="created">Created</span> {modalData?.createdOn}
              </div>
            )}
          </div>
          <div className="space-10" />
          <div className="buttons-options">
            <div className="buttons">
              {isNodePage && (
                <button
                  type="button"
                  onClick={() =>
                    organisationBackupHandler([
                      { id: modalData?.organizationId, data: {} },
                    ])
                  }
                >
                  <p>Backup</p>
                </button>
              )}
              {modalData?.active ? (
                <button
                  type="button"
                  onClick={() =>
                    isNodePage
                      ? modifyOrganizationHandler({
                          id: modalData?.organizationId,
                          data: { active: false },
                        })
                      : modifyAccountHandler({
                          address: modalData?.address,
                          data: { active: false },
                        })
                  }
                >
                  <p>Disable</p>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    isNodePage
                      ? modifyOrganizationHandler({
                          id: modalData?.organizationId,
                          data: { active: true },
                        })
                      : modifyAccountHandler({
                          address: modalData?.address,
                          data: { active: false },
                        })
                  }
                >
                  <p>Activate</p>
                </button>
              )}
            </div>
            {isNodePage && (
              <div className="options">
                <div className="createdAt">
                  <span className="created">Created</span>{' '}
                  {modalData?.createdOn}
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="createdAt">
                  <span className="created">Modified</span>{' '}
                  {modalData?.modifiedOn}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-25" />
        {!isNodePage ? (
          <>
            {' '}
            <UiInput
              imgSrc={lockIcon}
              label="Public key"
              name="account"
              placeholder={modalData?.address}
              disabled
            />
            <UiInput
              label="Full Name"
              placeholder={modalData?.fullName}
              name="fullName"
              onChange={handleModifyAccount}
              value={modifyAcc?.fullName || ''}
            />
          </>
        ) : (
          <>
            <UiInput
              imgSrc={lockIcon}
              label="Owner"
              disabled
              placeholder={modalData?.owner}
            />
            <UiInput
              label="Title"
              placeholder={modalData?.title}
              onChange={handleModifyOrg}
              name="title"
              value={modifyOrg?.title || ''}
            />
            <UiInput
              label="Legal address"
              placeholder={modalData?.legalAddress}
              name="legalAddress"
              onChange={handleModifyOrg}
              value={modifyOrg?.legalAddress || ''}
            />
          </>
        )}
        <div className="form-semicolon-wrapper">
          {/*todo modifyOrg?.email ==> modifyAcc.email*/}
          <UiInput
            label="Email"
            name="email"
            onChange={isNodePage ? handleModifyOrg : handleModifyAccount}
            value={isNodePage ? modifyOrg?.email : modifyAcc?.email}
          />
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
        {!isNodePage && (
          <>
            <div className="hr-line" />
            <div className="permissions-container">
              <div className="checkboxes">
                {permissionsArray.map((el) => (
                  <AuthCheckbox
                    key={el.key}
                    className="generate-key-form__checkbox"
                    label={el.label}
                    onChange={(e) => handleCheckbox(e, el.key)}
                    checked={userPermissions.includes(el.key)}
                  />
                ))}
              </div>
              <div className="access-lvl">
                <UiInput
                  type="number"
                  onChange={(value) => setUserAccessLevel(value)}
                  value={userAccessLevel}
                  label="Access level"
                  name="AccessLevel"
                  placeholder=""
                />
              </div>
            </div>
          </>
        )}
        <div className="btn-group">
          <UiButton onclick={closeModal} type="secondary">
            Cancel
          </UiButton>
          <UiButton type="primary" onclick={saveHandler}>
            Save
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
};

export default React.memo(MemberDetailsModal);
