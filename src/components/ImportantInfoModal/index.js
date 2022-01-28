import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';

import { handleModal } from '../../store/modules/modal';
import AuthButton from '../auth/AuthButton';
import importantInfo from '../../assets/svg/important-info.svg';

const ImportantInfoModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const closeInfoModal = () => {
    dispatch(handleModal({ modalName: '' }));
    history.push('/dashboard/signup/generated-key');
  };
  return (
    <div className="generated-key-info">
      <div className="generated-key-info__top-image">
        <ReactSVG src={importantInfo} wrapper="span" />
      </div>
      <h3 className="generated-key-info__title">important information</h3>
      <p>
        The keys provide access to your account.
        <br />
        Be diligent to keep your private key safe.
      </p>
      <p>
        <span className="do-not">Do NOT</span>&nbsp;&nbsp;lose it! It cannot be
        recovered if you do.
        <br />
        <span className="do-not">Do NOT</span>&nbsp;&nbsp;share it! Your account
        may be misused.
        <br />
        Create a backup.
      </p>
      <AuthButton className="important-btn" onClick={closeInfoModal}>
        I Understands
      </AuthButton>
    </div>
  );
};

export default ImportantInfoModal;
