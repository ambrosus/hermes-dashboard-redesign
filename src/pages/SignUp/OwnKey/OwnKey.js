import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import AuthInput from '../../../components/auth/AuthInput';
import AuthButton from '../../../components/auth/AuthButton';
import BackBtn from '../../../components/auth/BackBtn';
import { setPublicKeyAction } from '../../../store/modules/auth/actions';

const OwnKey = () => {
  const [publicKey, setPublicKey] = useState('');
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (value) => {
    setPublicKey(value);
    setDisabled(!window.web3.utils.isAddress(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPublicKeyAction(publicKey));
    history.push('/dashboard/signup/request');
  };

  return (
    <div className="own-key">
      <BackBtn />
      <h1>Register your public key</h1>
      <p>We will register your public key (also known as address).</p>
      <form className="own-key__form" onSubmit={handleSubmit}>
        <AuthInput
          onChange={handleChange}
          label="your public key"
          className="own-key__input"
        />
        <AuthButton
          type="submit"
          className="own-key__submit-btn"
          disabled={disabled}
        >
          Continue
        </AuthButton>
      </form>
    </div>
  );
};

export default OwnKey;
