import React from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { handleModal } from '../../../../../../store/modules/modal';
import MemberDetailsModal from './MemberDetailsModal';

const AccountsListItem = ({ acc }) => {
  const dispatch = useDispatch();

  const renderStatus = (type) => {
    switch (type) {
      case true:
        return (
          <div className="top__status" style={{ backgroundColor: '#1ACD8C' }}>
            Active
          </div>
        );
      case 'pending':
        return (
          <div className="top__status" style={{ backgroundColor: '#FECC58' }}>
            Pending
          </div>
        );
      case false:
        return (
          <div className="top__status" style={{ backgroundColor: '#D9E0EF' }}>
            Disabled
          </div>
        );
      default:
        throw new Error(
          'Account status must be in parameters of AccountsListItem component',
        );
    }
  };

  const openMemberDetailsModal = () =>
    dispatch(handleModal({ name: 'memberDetailsModal' }));

  return (
    <div className="accounts-tab__list--item">
      <MemberDetailsModal accountInfo={acc} />
      <div className="top">
        {renderStatus(acc.active)}
        <div className="top__name">{acc.email}</div>
      </div>
      <div className="options">
        <p className="options__text">
          {' '}
          <span className="key">Key&nbsp; &nbsp; </span>
          <span>{acc.address}</span>
        </p>
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
