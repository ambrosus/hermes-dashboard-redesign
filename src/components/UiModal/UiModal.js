import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { handleModal } from '../../store/modules/modal';

const UiModal = ({
  children,
  modalName,
  contentStyles,
  overlayStyles,
  isFullWindow,
}) => {
  const dispatch = useDispatch();

  const openedModalName = useSelector((state) => state.modal.openedModal.name);
  const isOpen = modalName === openedModalName;

  useEffect(
    () => () => {
      if (openedModalName) {
        dispatch(handleModal({ name: '' }));
      }
    },
    [],
  );

  useEffect(() => {
    if (isFullWindow && !openedModalName) {
      const body = document.querySelector('body');
      body.style.overflow = 'auto';
      body.style.position = 'static';
    }
  }, [openedModalName]);

  const closeModal = () => dispatch(handleModal({ name: '' }));

  const afterOpen = () => {
    if (isFullWindow) {
      const body = document.querySelector('body');
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpen}
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
          ...(isFullWindow && { width: '100%', height: '100%', padding: '0' }),
          ...contentStyles,
        },
        overlay: {
          backgroundColor: '#333333e6',
          ...(isFullWindow && {
            paddingTop: 60,
            background: 'transparent',
            pointerEvents: 'none',
          }),
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
  isFullWindow: PropTypes.bool,
};

export default UiModal;
