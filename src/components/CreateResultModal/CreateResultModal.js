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

  const applyFunc = useSelector((state) => state.modal.openedModal.data);

  const { percentsComplete, resultData } = useSelector(
    (state) => state.assets.createResult,
  );

  const [modalStep, setModalStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    setProgressPercent(percentsComplete);

    if (percentsComplete === 100) {
      setTimeout(() => {
        setModalStep(3);
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

  const handleApply = () => {
    setModalStep(2);
    dispatch(applyFunc());
  };

  const closeModal = () => dispatch(handleModal(null));
  const showDetails = () => setModalStep(4);

  const isAllSuccess = resultData.every((el) => el.isSuccess);

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
            You want proceed editing this asset?
          </p>
          <div className="create-result-modal__actions">
            <UiButton type="pale" onclick={closeModal}>
              Cancel
            </UiButton>
            <UiButton onclick={handleApply}>Proceed</UiButton>
          </div>
        </>
      )}
      {modalStep === 2 && (
        <>
          <p className="create-result-modal__title">Creating asset</p>
          <div className="create-result-modal__wait-block btn pale">
            Please wait...
          </div>
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
              Asset created successfully
            </p>
          ) : (
            <p className="create-result-modal__title">
              <ErrorIcon />
              There were problems while creating the asset
            </p>
          )}
          <UiButton
            onclick={showDetails}
            type="pale"
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
