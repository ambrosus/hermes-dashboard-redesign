import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import UiButton from '../UiButton';
import { handleModal } from '../../store/modules/modal';

const BulkEvent = () => {
  const dispatch = useDispatch();

  const openBulkModal = () => {
    dispatch(handleModal({ name: 'bulkEvent' }));
  };

  return ReactDOM.createPortal(
    <div className="bulk-event-wrapper">
      <div className="bulk-event">
        <p>
          By clicking on the account icon in the top right corner, you can
          navigate to “Settings” to revew or update your personal details.
        </p>
        <UiButton
          type="primary"
          onclick={openBulkModal}
          styles={{ height: 48, width: 180 }}
        >
          Bulk Event
        </UiButton>
      </div>
    </div>,
    document.querySelector('body'),
  );
};

export default BulkEvent;
