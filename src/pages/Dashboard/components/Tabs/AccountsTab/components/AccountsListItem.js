import React from 'react';
import * as PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { handleModal } from '../../../../../../store/modules/modal';
import {
  backupJSON,
  deleteInvite,
  handleOrganizationRequest,
  modifyAccount,
  modifyOrganization,
  resendInvites,
} from '../../../../../../utils/organizationService';
import dateFormatter from '../../../../../../utils/dateFormatter';

const AccountsListItem = ({
  info,
  handleAccounts,
  fetchOrganizations,
  fetchAccounts,
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  const isNodePage = pathname === '/dashboard/node';

  const renderStatus = (obj) => {
    if (obj.active) {
      return (
        <div className="top__status" style={{ backgroundColor: '#1ACD8C' }}>
          Active
        </div>
      );
    }
    if (obj && obj.refused) {
      return (
        <div className="top__status" style={{ backgroundColor: '#BFC9E0' }}>
          Declined
        </div>
      );
    }
    if (
      !obj.active &&
      obj.createdBy &&
      !Object.prototype.hasOwnProperty.call(obj, 'sent')
    ) {
      return (
        <div className="top__status" style={{ backgroundColor: '#D9E0EF' }}>
          Disabled
        </div>
      );
    }
    if (obj && !obj.active) {
      return (
        <div className="top__status" style={{ backgroundColor: '#FECC58' }}>
          Pending
        </div>
      );
    }
    return false;
  };

  const resendInviteHandler = async (email) => {
    try {
      await resendInvites({ email: [`${email}`] });
      NotificationManager.success(
        `Invite for ${email} was resend successfully`,
        'Resend success',
      );
    } catch (e) {
      NotificationManager.error(e.toString());
    }
  };

  const revokeInviteHandler = async (inviteId) => {
    await deleteInvite(inviteId);
    NotificationManager.success('Invite was revoked');
    fetchAccounts();
  };

  const organisationBackupHandler = async (...args) => {
    const { id } = args[0][0];
    try {
      await backupJSON(id);
      NotificationManager.success(`id: ${id}`, 'Backup created');
    } catch (error) {
      NotificationManager.error(error);
    }
  };

  const openMemberDetailsModal = () =>
    dispatch(handleModal({ name: 'memberDetailsModal', data: info }));

  const modifyOrganizationHandler = async (...args) => {
    const { id, data } = args[0];
    try {
      await modifyOrganization(id, data);

      handleAccounts(id, data.active, !isNodePage);
    } catch (error) {
      console.log(error);
    }
  };

  const organizationRequest = async (...args) => {
    const { id, approved } = args[0];
    try {
      await handleOrganizationRequest(id, approved);

      fetchOrganizations();

      NotificationManager.success('Account modified');
    } catch (error) {
      NotificationManager.error(error);
    }
  };

  const openModal = () => {
    dispatch(
      handleModal({
        name: 'deleteAccount',
        data: async () => {
          await modifyAccount(info.address, { active: false });
          handleAccounts(info.address, false, true);

          if (userInfo.address === info.address) {
            sessionStorage.removeItem('user_private_key');
            sessionStorage.removeItem('user_account');
            window.location.reload();
          }
          dispatch(handleModal({ name: '' }));
        },
      }),
    );
  };

  const nodePageButtons = (
    <div className="options__buttons">
      <>
        {!info.active && !info.owner && !info.organizationId && !info.refused && (
          <>
            <button
              type="button"
              onClick={() =>
                organizationRequest({ id: info.address, approved: true })
              }
            >
              <p>Approve</p>
            </button>
            <button
              type="button"
              onClick={() =>
                organizationRequest({ id: info.address, approved: false })
              }
            >
              <p>Decline</p>
            </button>
          </>
        )}
        {((isNodePage && info.owner === null) ||
          (isNodePage && !!info.owner && info.organizationId)) && (
          <>
            <button type="button" onClick={openMemberDetailsModal}>
              <p>Edit</p>
            </button>
            <button
              type="button"
              onClick={() =>
                organisationBackupHandler([
                  { id: info.organizationId, data: {} },
                ])
              }
            >
              <p>Backup</p>
            </button>
            {info.active ? (
              <button
                type="button"
                onClick={() =>
                  modifyOrganizationHandler({
                    id: info.organizationId,
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
                  modifyOrganizationHandler({
                    id: info.organizationId,
                    data: { active: true },
                  })
                }
              >
                <p>Activate</p>
              </button>
            )}
          </>
        )}
      </>
    </div>
  );

  const notNodePageButtons = (
    <div className="options__buttons">
      <>
        {info.validUntil && (
          <>
            <button
              type="button"
              onClick={() => revokeInviteHandler(info.inviteId)}
            >
              <p>Revoke</p>
            </button>
            <button
              type="button"
              onClick={() => resendInviteHandler(info.email)}
            >
              <p>Resend</p>
            </button>
          </>
        )}
        {!info.validUntil && (
          <>
            <button type="button" onClick={openMemberDetailsModal}>
              <p>Edit</p>
            </button>
            {info.active ? (
              <button type="button" onClick={openModal}>
                <p>Disable</p>
              </button>
            ) : (
              <button
                type="button"
                onClick={async () => {
                  await modifyAccount(info.address, { active: true });
                  handleAccounts(info.address, true, true);
                }}
              >
                <p>Activate</p>
              </button>
            )}
          </>
        )}
      </>
    </div>
  );

  return (
    <div className="accounts-tab__list--item">
      <div className="top">
        {renderStatus(info)}
        <div className="top__name">{isNodePage ? info.title : info.email}</div>
        <span className="top__created-on">
          {Number.isInteger(+info.createdOn)
            ? `${dateFormatter(moment.unix(info.createdOn))} ago`
            : info.createdOn}
        </span>
      </div>
      <div className="options">
        {isNodePage ? (
          <p className="options__text">
            {' '}
            <span className="key">Owner&nbsp; &nbsp; </span>
            <span>{info.owner ? info.owner : 'none'}</span>
          </p>
        ) : (
          <p className="options__text">
            {' '}
            {info && !info.active ? (
              <>
                <span className="key">InviteId&nbsp; &nbsp; </span>
                <span>{info.inviteId}</span>
              </>
            ) : (
              <>
                <span className="key">Key&nbsp; &nbsp; </span>
                <span>{info.address}</span>
              </>
            )}
          </p>
        )}

        {isNodePage ? nodePageButtons : notNodePageButtons}
      </div>
    </div>
  );
};

AccountsListItem.propTypes = {
  info: PropTypes.object,
  handleAccounts: PropTypes.func,
  fetchOrganizations: PropTypes.func,
  fetchAccounts: PropTypes.func,
};

export default React.memo(AccountsListItem);
