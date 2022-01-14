import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { handleModal } from '../../store/modules/modal';

const UiModal = ({ children, modalName, contentStyles, overlayStyles }) => {
  const dispatch = useDispatch();

  const openedModalName = useSelector((state) => state.modal.openedModal.name);
  const isOpen = modalName === openedModalName;

  const closeModal = () => dispatch(handleModal({ name: '' }));

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          position: 'relative',
          inset: 0,
          maxHeight: '100%',
          overflow: 'auto',
          width: 680,
          margin: '0 auto',
          boxShadow: '0px 4px 12px rgba(55, 29, 199, 0.15)',
          border: 0,
          padding: 40,
          ...contentStyles,
        },
        overlay: {
          backgroundColor: '#333333e6',
          ...overlayStyles,
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
  contentStyles: PropTypes.object,
  overlayStyles: PropTypes.object,
};

export default UiModal;
