import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';
import AuthCheckbox from '../AuthCheckbox';
import AuthButton from '../AuthButton';
import { setEthAddress } from '../../../store/modules/auth/actions';
import { handleModal } from '../../../store/modules/modal';

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
          `https://vitalii427-hermes.ambrosus-test.io/organization/invite/${inviteAddress}/accept`,
          { address: ethAddress.publicKey },
        )
        .then(() => {
          history.push('/dashboard/login');
        });
    }
    history.push('/dashboard/signup/request');
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
      <p>Find your public/private key pair below.</p>
      <div className="generate-key-main">
        <p className="generate-key-main__label">YOUR PUBLIC KEY</p>
        <p className="generate-key-main__key">{ethAddress.publicKey}</p>
        <p className="generate-key-main__label">YOUR PRIVATE KEY</p>
        <p className="generate-key-main__key">{ethAddress.privateKey}</p>
        <a
          className="generate-key-main__download"
          href={downloadKeysUrl}
          download="keys.json"
        >
          download keystore file (json)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="#333333"
            style={{ width: 32, height: 29, fill: '#00b7f9' }}
          >
            <path d="M10 23C10 22.4477 9.55228 22 9 22C8.44772 22 8 22.4477 8 23H10ZM10 29V30H10L10 29ZM30 29V28V29ZM32 23C32 22.4477 31.5523 22 31 22C30.4477 22 30 22.4477 30 23H32ZM19 21C19 21.5523 19.4477 22 20 22C20.5523 22 21 21.5523 21 21H19ZM21 9C21 8.44772 20.5523 8 20 8C19.4477 8 19 8.44772 19 9H21ZM16.7071 17.2929C16.3166 16.9024 15.6834 16.9024 15.2929 17.2929C14.9024 17.6834 14.9024 18.3166 15.2929 18.7071L16.7071 17.2929ZM20 22L19.2929 22.7071C19.6834 23.0976 20.3166 23.0976 20.7071 22.7071L20 22ZM24.7071 18.7071C25.0976 18.3166 25.0976 17.6834 24.7071 17.2929C24.3166 16.9024 23.6834 16.9024 23.2929 17.2929L24.7071 18.7071ZM8 23V28H10V23H8ZM8 28C8 29.1023 8.89772 30 10 30V28H8ZM10 30L30 30V28L10 28L10 30ZM30 30C31.1023 30 32 29.1023 32 28H30V28V30ZM32 28V23H30V28H32ZM21 21V9H19V21H21ZM15.2929 18.7071L19.2929 22.7071L20.7071 21.2929L16.7071 17.2929L15.2929 18.7071ZM23.2929 17.2929L19.2929 21.2929L20.7071 22.7071L24.7071 18.7071L23.2929 17.2929Z" />
          </svg>
        </a>
      </div>
      <p className="generate-key-form__secure">
        <button
          type="button"
          onClick={openModal}
          className="auth-page__link generate-key-form__secure"
        >
          How to secure the keys?
        </button>
      </p>
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
