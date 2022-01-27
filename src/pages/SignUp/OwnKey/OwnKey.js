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
    <div style={{ position: 'relative' }}>
      <BackBtn />
      <div className="own-key">
        <h1 className="own-key__heading">Register your public key</h1>
        <p className="own-key__secondary">
          We will register your public key (also known as address)
        </p>
        <form className="own-key__form" onSubmit={handleSubmit}>
          <AuthInput
            onChange={handleChange}
            label="Your public key"
            className="own-key__input"
            leftEl={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5003 7.5L19.0003 4M21.0003 2L19.0003 4L21.0003 2ZM11.3903 11.61C11.9066 12.1195 12.3171 12.726 12.598 13.3948C12.879 14.0635 13.0249 14.7813 13.0273 15.5066C13.0297 16.232 12.8887 16.9507 12.6122 17.6213C12.3357 18.2919 11.9293 18.9012 11.4164 19.4141C10.9035 19.9271 10.2942 20.3334 9.62358 20.6099C8.95296 20.8864 8.23427 21.0275 7.50891 21.025C6.78354 21.0226 6.06582 20.8767 5.39707 20.5958C4.72831 20.3148 4.12174 19.9043 3.61227 19.388C2.6104 18.3507 2.05604 16.9614 2.06857 15.5193C2.0811 14.0772 2.65953 12.6977 3.67927 11.678C4.69902 10.6583 6.07849 10.0798 7.52057 10.0673C8.96265 10.0548 10.352 10.6091 11.3893 11.611L11.3903 11.61ZM11.3903 11.61L15.5003 7.5L11.3903 11.61ZM15.5003 7.5L18.5003 10.5L22.0003 7L19.0003 4L15.5003 7.5Z"
                  stroke="#CFD6E4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
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
    </div>
  );
};

export default OwnKey;
