import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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

const MemberDetailsModal = ({ handleUserActive, fetchAccounts, fetchOrganizations }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isNodePage = pathname === '/dashboard/node';
  const { accessLevel } = useSelector(
    (state) => state.auth.userInfo,
  );
  const modalData = useSelector((state) => state.modal.openedModal.data);
  const [userPermissions, setUserPermissions] = useState(modalData.permissions);
  const [userAccessLevel, setUserAccessLevel] = useState(accessLevel);
  const [modifyOrg, setModifyOrg] = useState({
    title: modalData.title,
    legalAddress: modalData.legalAddress || '',
  });
  const [modifyAcc, setModifyAcc] = useState({
    fullName: modalData.fullName || '',
    email: modalData.email,
  });
  const [isActive, setIsActive] = useState(modalData.active);

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

      handleUserActive(id, data.active);
      setIsActive(data.active);
    } catch (error) {
      console.log(error);
    }
  };

  const saveHandler = async () => {
    if (isNodePage) {
      await modifyOrganization(modalData?.organization || modalData?.organizationId, {
        ...(modifyOrg.legalAddress && { legalAddress: modifyOrg.legalAddress }),
        ...(modifyOrg.title && modifyOrg.title !== modalData.title && { title: modifyOrg.title }),
      }, modifyOrg)

      fetchOrganizations();
    } else {
      await modifyAccount(modalData?.address, {
        ...(modifyAcc.fullName && { fullName: modifyAcc.fullName }),
        ...(modifyAcc.email && { email: modifyAcc.email }),
        ...(+userAccessLevel !== +accessLevel && { accessLevel: +userAccessLevel }),
        permissions: userPermissions,
      });

      fetchAccounts();
    }
    dispatch(handleModal({ name: '' }));
  };

  const handleModifyOrg = (keyValue) => {
    setModifyOrg({ ...modifyOrg, ...keyValue });
  };

  function handleModifyAccount(keyValue) {
    setModifyAcc({ ...modifyAcc, ...keyValue });
  }

  const handleAccountStatus = async (status) => {
    try {
      if (isNodePage) {
        await modifyOrganizationHandler({
          id: modalData?.organization || modalData?.organizationId,
          data: { active: false },
        });
      } else {
        await modifyAccount(modalData.address, { active: status });
      }

      handleUserActive(
        isNodePage
          ? modalData?.organization || modalData?.organizationId
          : modalData.address,
        status,
        !isNodePage,
      );
      setIsActive(status);
    } catch (err) {
      console.log(err);
    }
  };

  const isDisabled = isNodePage
    ? (modifyOrg.title === modalData.title &&
      modifyOrg.legalAddress === (modalData.legalAddress || '')) ||
      (!modifyOrg.title && modalData.title) ||
      (!modifyOrg.legalAddress && modalData.legalAddress)
    : ((modifyAcc.email === modalData.email &&
        modifyAcc.fullName === (modalData.fullName || '')) ||
        (!modifyAcc.fullName && modalData.fullName)) &&
      modalData.permissions.length === userPermissions.length &&
      +userAccessLevel === +modalData.accessLevel;

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
              {isActive ? (
                <button
                  type="button"
                  onClick={() => handleAccountStatus(false)}
                >
                  <p>Disable</p>
                </button>
              ) : (
                <button
                  style={{ backgroundColor: '#1ACD8C' }}
                  type="button"
                  onClick={() => handleAccountStatus(true)}
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
              label="Full name"
              placeholder={modalData?.fullName}
              name="fullName"
              onChange={handleModifyAccount}
              value={modifyAcc?.fullName || ''}
            />
            <UiInput
              label="Email"
              name="email"
              onChange={handleModifyAccount}
              value={modifyAcc?.email || ''}
            />
          </>
        ) : (
          <>
            <UiInput
              imgSrc={lockIcon}
              label="Owner"
              disabled
              onChange={handleModifyOrg}
              placeholder={modalData?.owner}
            />
            <UiInput
              label="Title"
              onChange={handleModifyOrg}
              name="title"
              value={modifyOrg.title || ''}
            />
            <UiInput
              label="Legal address"
              name="legalAddress"
              onChange={handleModifyOrg}
              value={modifyOrg.legalAddress}
            />
          </>
        )}
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
                  placeholder=""
                  maxNumber={900}
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
          <UiButton type="primary" disabled={isDisabled} onclick={saveHandler}>
            Save
          </UiButton>
        </div>
      </div>
    </UiModal>
  );
};

MemberDetailsModal.propTypes = {
  handleUserActive: PropTypes.func,
  fetchAccounts: PropTypes.func,
  fetchOrganizations: PropTypes.func,
};

export default React.memo(MemberDetailsModal);
