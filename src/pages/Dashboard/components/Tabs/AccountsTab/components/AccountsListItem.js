import React from 'react';
import * as PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleModal } from '../../../../../../store/modules/modal';
import {
  backupJSON,
  deleteInvite,
  handleOrganizationRequest,
  modifyAccount,
  modifyOrganization,
  resendInvites,
} from '../../../../../../utils/organizationService';

const AccountsListItem = ({ info }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isNodePage = pathname === '/dashboard/node';

  const renderStatus = (obj) => {
    if (obj.active) {
      return (
        <div className="top__status" style={{ backgroundColor: '#1ACD8C' }}>
          Active
        </div>
      );
    }
    if (obj && obj?.refused) {
      return (
        <div className="top__status" style={{ backgroundColor: '#D9E0EF' }}>
          Declined
        </div>
      );
    }
    if (obj.accessLevel === 1) {
      return (
        <div className="top__status" style={{ backgroundColor: '#BFC9E0' }}>
          Disabled
        </div>
      );
    }
    if (!obj.active && obj.modifiedOn) {
      return (
        <div className="top__status" style={{ backgroundColor: '#BFC9E0' }}>
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
    await resendInvites({ email: [`${email}`] });
  };
  const revokeInviteHandler = async (inviteId) => {
    await deleteInvite(inviteId);
  };
  const organisationBackupHandler = async (...args) => {
    const { id } = args[0][0];
    try {
      await backupJSON(id);
    } catch (error) {
      console.error('[BACKUP] Organization: ', error);
    }
  };
  const openMemberDetailsModal = () =>
    dispatch(handleModal({ name: 'memberDetailsModal', data: info }));
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
  const organizationRequest = async (...args) => {
    const { id, approved } = args[0];
    console.log(id);
    console.log(approved);
    try {
      await handleOrganizationRequest(id, approved);
      console.log('Account modified');
    } catch (error) {
      console.error('[MODIFY] Account: ', error);
    }
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
                organizationRequest({ id: info.address, approved: true })
              }
            >
              <p>Decline</p>
            </button>
          </>
        )}
        {isNodePage && info.owner === null && (
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
                  isNodePage
                    ? modifyOrganizationHandler({
                        id: info.organizationId,
                        data: { active: false },
                      })
                    : modifyAccountHandler({
                        address: info.address,
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
                        id: info.organizationId,
                        data: { active: true },
                      })
                    : modifyAccountHandler({
                        address: info.address,
                        data: { active: false },
                      })
                }
              >
                <p>Activate</p>
              </button>
            )}
          </>
        )}
        {isNodePage && !!info.owner && info.organizationId && (
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
                  isNodePage
                    ? modifyOrganizationHandler({
                        id: info.organizationId,
                        data: { active: false },
                      })
                    : modifyAccountHandler({
                        address: info.address,
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
                        id: info.organizationId,
                        data: { active: true },
                      })
                    : modifyAccountHandler({
                        address: info.address,
                        data: { active: false },
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
              style={{ backgroundColor: '#4A38AE' }}
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
              <button
                type="button"
                onClick={() =>
                  isNodePage
                    ? modifyOrganizationHandler({
                        id: info.organizationId,
                        data: { active: false },
                      })
                    : modifyAccountHandler({
                        address: info.address,
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
                        id: info.organizationId,
                        data: { active: true },
                      })
                    : modifyAccountHandler({
                        address: info.address,
                        data: { active: false },
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
  return (
    <div className="accounts-tab__list--item">
      <div className="top">
        {renderStatus(info)}
        <div className="top__name">{isNodePage ? info.title : info.email}</div>
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
};

export default AccountsListItem;
