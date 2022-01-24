import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { handleModal } from '../../../../../../store/modules/modal';
import UiButton from '../../../../../../components/UiButton';
import UiModal from '../../../../../../components/UiModal';
import UiInput from '../../../../../../components/UiInput';
import lockIcon from '../../../../../../assets/svg/lock.svg';
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
    }
  }, [userPermissions]);

  const closeModal = () => dispatch(handleModal({ name: null }));

  const organisationBackupHandler = async (...args) => {
    const { id } = args[0][0];
    try {
      await backupJSON(id);
      NotificationManager.success(`Organization ${id} backup`);
    } catch (error) {
      NotificationManager.success(error.toString());
    }
  };
  const modifyOrganizationHandler = async (...args) => {
    const { id, data } = args[0];
    try {
      await modifyOrganization(id, data);
      NotificationManager.success(`Organization ${id} modified`);
    } catch (error) {
      NotificationManager.error(error.toString());
    }
  };

  const saveHandler = async () => {
    try {
      isNodePage
        ? await modifyOrganization(modalData.organizationId, modifyOrg)
        : await modifyAccount(modalData?.address, modifyAcc);
      NotificationManager.success(`Changes was save successfully`);
    } catch (error) {
      NotificationManager.success(error.toString());
    }
  };

  const handleModifyOrg = (keyValue) => {
    setModifyOrg({ ...modifyOrg, ...keyValue });
  };

  function handleModifyAccount(keyValue) {
    setModifyAcc({ ...modifyAcc, ...keyValue });
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
            {!isNodePage && (
              <p className="options__text">
                {' '}
                <span className="key">Key &nbsp; &nbsp;</span>
                <span>{modalData?.address}</span>
              </p>
            )}
            {!isNodePage && (
              <div className="createdAt">
                {/* TODO format data from server */}
                <span className="created">Created</span> {modalData?.createdOn}
              </div>
            )}
          </div>
          <div className="space-10" />
          <div className="buttons-options">
            <div className="buttons">
              {modalData.active ? (
                <button
                  type="button"
                  onClick={() =>
                    modifyOrganizationHandler({
                      id: modalData?.organization || modalData?.organizationId,
                      data: { active: false },
                    })
                  }
                >
                  <p>Disable</p>
                </button>
              ) : (
                <button
                  style={{ backgroundColor: '#1ACD8C' }}
                  type="button"
                  onClick={() =>
                    modifyOrganizationHandler({
                      id: modalData?.organization || modalData?.organizationId,
                      data: { active: true },
                    })
                  }
                >
                  <p>Activate</p>
                </button>
              )}
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
            </div>
            {isNodePage && (
              <div className="options">
                <div className="createdAt">
                  <span className="created">Created</span>{' '}
                  {modalData?.createdOn}
                </div>
                &nbsp;&nbsp;&nbsp;
                {modalData?.modifiedOn && (
                  <div className="createdAt">
                    <span className="created">Modified</span>{' '}
                    {moment.unix(modalData.modifiedOn).format('DD MMM YYYY')}
                  </div>
                )}
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
              label="Name"
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
          </>
        )}
        <UiInput
          label="Email"
          name="email"
          onChange={isNodePage ? handleModifyOrg : handleModifyAccount}
          value={isNodePage ? modifyOrg?.email : modifyAcc?.email}
        />
        {!isNodePage && (
          <>
            <div className="hr-line" />
            <div className="permissions-container">
              <div className="checkboxes">
                <label className="ui-input__label">Permissions</label>
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
        {!isNodePage && (
          <div className="info-member-modal-block">
            {modalData?.active ? (
              <div className="status" style={{ backgroundColor: '#1ACD8C' }}>
                Active
              </div>
            ) : (
              <div className="status" style={{ backgroundColor: '#BFC9E0' }}>
                Disabled
              </div>
            )}
            <div className="text">
              You can add or remove account permissions and access level. If you
              uncheck all permissions, you will disable this account.
            </div>
          </div>
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
