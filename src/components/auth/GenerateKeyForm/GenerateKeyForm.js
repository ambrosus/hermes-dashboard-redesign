import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import AuthCheckbox from '../AuthCheckbox';
import AuthButton from '../AuthButton';
import { setEthAddress } from '../../../store/modules/auth/actions';
import { handleModal } from '../../../store/modules/modal';

import fiKeyIcon from '../../../assets/svg/fi_key.svg';
import copyIcon from '../../../assets/svg/fi_copy.svg';
import { environment } from '../../../utils/environment';

const GenerateKeyForm = () => {
  const ethAddress = useSelector((state) => state.auth.etherAddress);
  const { inviteAddress } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [checkboxValue, setCheckboxValue] = useState(false);

  useEffect(() => {
    dispatch(setEthAddress());
  }, []);

  const handleCheckbox = () => {
    setCheckboxValue(!checkboxValue);
  };

  const handleClick = () => {
    if (inviteAddress) {
      axios
        .post(
          `${environment.api.extended}/organization/invite/${inviteAddress}/accept`,
          { address: ethAddress.publicKey },
        )
        .then(() => {
          history.push('/dashboard/login');
        });
    } else {
      history.push('/dashboard/signup/request');
    }
  };

  const copyKey = (text) => {
    copyToClipboard(text);
    NotificationManager.success('Copied to clipboard');
  };

  const downloadKeysUrl = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({
      privateKey: ethAddress.privateKey,
      address: ethAddress.publicKey,
    }),
  )}`;

  const openModal = () => dispatch(handleModal({ name: 'secureKeys' }));

  return (
    <div className="generate-key-form">
      <h1 className="generate-key-form__title">First, save your keys!</h1>
      <p className="generate-key-form__secondary">
        Find your public/private key pair below.
      </p>
      <div className="generated">
        <p className="label">Your public key</p>
        <div className="key-container">
          <div className="left-icon">
            <ReactSVG src={fiKeyIcon} wrapper="span" />
          </div>
          <div className="generate-key-main__key">{ethAddress.publicKey}</div>
          <div className="right-icon">
            <ReactSVG
              onClick={() => copyKey(ethAddress.publicKey)}
              src={copyIcon}
              wrapper="span"
            />
          </div>
        </div>
        <p className="label">Your private key</p>
        <div className="key-container">
          <div className="left-icon">
            <ReactSVG src={fiKeyIcon} wrapper="span" />
          </div>
          <div className="generate-key-main__key"> {ethAddress.privateKey}</div>
          <div className="right-icon">
            <ReactSVG
              onClick={() => copyKey(ethAddress.privateKey)}
              src={copyIcon}
              wrapper="span"
            />
          </div>
        </div>
      </div>
      <div className="generate-key-main">
        <a
          className="generate-key-main__download"
          href={downloadKeysUrl}
          download="keys.json"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 12H21C21.1989 12 21.3897 12.079 21.5303 12.2197C21.671 12.3603 21.75 12.5511 21.75 12.75V18.75C21.75 18.9489 21.671 19.1397 21.5303 19.2803C21.3897 19.421 21.1989 19.5 21 19.5H3C2.80109 19.5 2.61032 19.421 2.46967 19.2803C2.32902 19.1397 2.25 18.9489 2.25 18.75V12.75C2.25 12.5511 2.32902 12.3603 2.46967 12.2197C2.61032 12.079 2.80109 12 3 12H7.5"
              stroke="#15D378"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 2.25V12"
              stroke="#15D378"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 7.5L12 12L16.5 7.5"
              stroke="#15D378"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.625 16.875C18.2463 16.875 18.75 16.3713 18.75 15.75C18.75 15.1287 18.2463 14.625 17.625 14.625C17.0037 14.625 16.5 15.1287 16.5 15.75C16.5 16.3713 17.0037 16.875 17.625 16.875Z"
              fill="#15D378"
            />
          </svg>
          &nbsp;&nbsp; Download Keystore file (JSON)
        </a>
        <button
          type="button"
          onClick={openModal}
          className="generate-key-main__secure"
        >
          How to secure the keys?
        </button>
      </div>
      <AuthCheckbox
        className="generate-key-form__checkbox"
        label="I have saved my keys"
        onChange={handleCheckbox}
        checked={checkboxValue}
      />
      <AuthButton onClick={handleClick} disabled={!checkboxValue}>
        Continue
      </AuthButton>
    </div>
  );
};

export default GenerateKeyForm;
