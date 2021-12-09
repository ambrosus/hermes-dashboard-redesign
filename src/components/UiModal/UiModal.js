import React from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const UiModal = ({ children, modalName }) => {
  const openedModal = useSelector((state) => state.modal.openedModal);

  return (
    <Modal
      isOpen={modalName === openedModal}
      style={{
        content: {
          maxWidth: 680,
          margin: '0 auto',
          boxShadow: '0px 4px 12px rgba(55, 29, 199, 0.15)',
          border: 0,
          padding: 40,
        },
      }}
    >
      {children}
    </Modal>
  );
};

UiModal.propTypes = {
  children: PropTypes.element,
  modalName: PropTypes.string,
};

export default UiModal;
