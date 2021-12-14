import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import UiButton from '../UiButton';
import { ReactComponent as CloseIcon } from '../../assets/svg/cross.svg';
import { ReactComponent as CheckedIcon } from '../../assets/svg/checkbox-green.svg';
import { ReactComponent as ErrorIcon } from '../../assets/svg/error.svg';
import { handleModal } from '../../store/modules/modal';
import {
  SET_CREATE_ASSET_RESULT,
  SET_CREATE_EVENT_RESULT,
} from '../../store/modules/assets/constants';
import DetailsItem from './DetailsItem';

const CreateResultModal = ({ confirmCallback }) => {
  const dispatch = useDispatch();
  const { assetId } = useParams();

  const createFormData = useSelector((state) => state.modal.openedModal.data);

  const { createAssetResult, createEventResult } = useSelector(
    (state) => state.assets,
  );

  const [modalStep, setModalStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    if (createAssetResult) {
      setProgressPercent(60);
    }
  }, [createAssetResult]);

  useEffect(() => {
    if (createEventResult) {
      setProgressPercent(100);

      setTimeout(() => {
        setModalStep(3);
      }, 500);
    }
  }, [createEventResult]);

  useEffect(
    () => () => {
      dispatch({
        type: SET_CREATE_ASSET_RESULT,
        payload: null,
      });
      dispatch({
        type: SET_CREATE_EVENT_RESULT,
        payload: null,
      });
    },
    [],
  );

  const handleApply = () => {
    setModalStep(2);
    dispatch(
      createFormData.isCreateEvent
        ? confirmCallback(assetId, createFormData)
        : confirmCallback(createFormData),
    );
  };

  const closeModal = () => dispatch(handleModal(null));
  const showDetails = () => setModalStep(4);

  const isAllSuccess =
    createEventResult &&
    createEventResult.isSuccess &&
    (!createAssetResult || createAssetResult.isSuccess);

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
            <UiButton type="pale">Cancel</UiButton>
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
          {createAssetResult && <DetailsItem itemData={createAssetResult} />}
          <DetailsItem itemData={createEventResult} />
        </>
      )}
    </div>
  );
};

CreateResultModal.propTypes = {
  confirmCallback: PropTypes.func,
};

export default CreateResultModal;
