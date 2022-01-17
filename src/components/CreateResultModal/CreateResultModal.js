import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UiButton from '../UiButton';
import { ReactComponent as CloseIcon } from '../../assets/svg/cross.svg';
import { ReactComponent as CheckedIcon } from '../../assets/svg/checkbox-green.svg';
import { ReactComponent as ErrorIcon } from '../../assets/svg/error.svg';
import { handleModal } from '../../store/modules/modal';
import { SET_CREATE_RESULT } from '../../store/modules/assets/constants';
import DetailsItem from './DetailsItem';

const CreateResultModal = () => {
  const dispatch = useDispatch();

  const modalData = useSelector((state) => state.modal.openedModal.data);

  const { percentsComplete, resultData } = useSelector(
    (state) => state.assets.createResult,
  );

  const [modalStep, setModalStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);

  const isAllSuccess = resultData.every((el) => el.isSuccess);

  useEffect(() => {
    setProgressPercent(percentsComplete);

    if (percentsComplete === 100) {
      setTimeout(() => {
        setModalStep(3);

        if (isAllSuccess) {
          dispatch(handleModal({ name: '' }));
        }
      }, 500);
    }
  }, [percentsComplete]);

  useEffect(
    () => () => {
      dispatch({
        type: SET_CREATE_RESULT,
        payload: {
          resultData: [],
          percentsComplete: 0,
        },
      });
    },
    [],
  );

  useEffect(() => {
    if (modalStep === 2) {
      dispatch(modalData.submitFunc());
    }
  }, [modalStep]);

  if (!modalData) {
    return null;
  }

  const { isEvent } = modalData;

  const handleApply = () => {
    setModalStep(2);
  };

  const closeModal = () => dispatch(handleModal(null));
  const showDetails = () => setModalStep(4);

  return (
    <div className="create-result-modal">
      <button
        onClick={closeModal}
        type="button"
        className="create-result-modal__close"
      >
        <CloseIcon />
      </button>
      {modalStep === 1 && (
        <>
          <p className="create-result-modal__title">
            You want proceed editing this
            {isEvent ? ' event ' : ' asset '}?
          </p>
          <div className="create-result-modal__actions">
            <UiButton type="secondary" onclick={closeModal}>
              Cancel
            </UiButton>
            <UiButton type="primary" onclick={handleApply}>
              Proceed
            </UiButton>
          </div>
        </>
      )}
      {modalStep === 2 && (
        <>
          <p className="create-result-modal__title">
            Creating
            {isEvent ? ' event' : ' asset'}
          </p>
          <div className="create-result-modal__wait-block">Please wait...</div>
          <div className="create-result-modal__progress">
            <div
              className="create-result-modal__progress-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}
      {modalStep === 3 && (
        <>
          {isAllSuccess ? (
            <p className="create-result-modal__title">
              <CheckedIcon />
              {isEvent ? ' Event ' : ' Asset '}
              created successfully
            </p>
          ) : (
            <p className="create-result-modal__title">
              <ErrorIcon />
              There were problems while creating the
              {isEvent ? ' event' : ' asset'}
            </p>
          )}
          <UiButton
            onclick={showDetails}
            type="secondary"
            styles={{ width: 160, height: 48 }}
            className="create-result-modal__wait-block"
          >
            Details
          </UiButton>
          <div className="create-result-modal__progress">
            <div
              className="create-result-modal__progress-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}
      {modalStep === 4 && (
        <>
          <p className="create-result-modal__title">
            All responses for this session
          </p>
          {resultData.map((el) => (
            <DetailsItem itemData={el} />
          ))}
        </>
      )}
    </div>
  );
};

export default CreateResultModal;
