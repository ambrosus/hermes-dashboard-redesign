import React from 'react';
import * as PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleModal } from '../../../../../../store/modules/modal';
import MemberDetailsModal from './MemberDetailsModal';

const AccountsListItem = ({ acc }) => {
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

  const openMemberDetailsModal = () =>
    dispatch(handleModal({ name: 'memberDetailsModal' }));

  return (
    <div className="accounts-tab__list--item">
      <MemberDetailsModal accountInfo={acc} />
      <div className="top">
        {renderStatus(acc)}
        <div className="top__name">{isNodePage ? acc.title : acc.email}</div>
      </div>
      <div className="options">
        {isNodePage ? (
          <p className="options__text">
            {' '}
            <span className="key">Owner&nbsp; &nbsp; </span>
            <span>{acc.owner ? acc.owner : 'none'}</span>
          </p>
        ) : (
          <p className="options__text">
            {' '}
            {acc && !acc.active ? (
              <>
                <span className="key">InviteId&nbsp; &nbsp; </span>
                <span>{acc.inviteId}</span>
              </>
            ) : (
              <>
                <span className="key">Key&nbsp; &nbsp; </span>
                <span>{acc.address}</span>
              </>
            )}
          </p>
        )}

        <div className="options__buttons">
          <button type="button" onClick={openMemberDetailsModal}>
            <p>Edit</p>
          </button>
          <button type="button">
            <p>Disable</p>
          </button>
        </div>
      </div>
    </div>
  );
};

AccountsListItem.propTypes = {
  acc: PropTypes.object,
};

export default AccountsListItem;
