/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';
import Tooltip from 'react-simple-tooltip';
import AuthInput from '../AuthInput';
import AuthButton from '../AuthButton';
import { signIn } from '../../../store/modules/auth/actions';

const KeyLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth, userInfo } = useSelector((state) => state.auth);

  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    if (isAuth) {
      if (userInfo.permissions?.includes('super_account')) {
        history.push('/dashboard/node/');
      } else {
        history.push('/dashboard/assets/');
      }
    }
  }, [isAuth]);

  const signInUser = (e) => {
    e.preventDefault();
    if (privateKey.length === 66) {
      dispatch(signIn(privateKey));
    } else {
      NotificationManager.error('Incorrect key');
    }
  };

  return (
    <form className="key-login" onSubmit={signInUser}>
      <AuthInput
        onChange={setPrivateKey}
        label="your private key"
        className="key-login__input"
        rightEl={
          <Tooltip
            content="For maximum security, your private key will never leave your browser."
            fontSize="13px"
          >
            <svg
              className="tooltip-info-btn"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 510 510"
              style={{ width: 16, height: 16 }}
            >
              <path d="M229.5 382.5h51v-153h-51v153zM255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204zm-25.5-280.5h51v-51h-51v51z" />
            </svg>
          </Tooltip>
        }
      />
      <AuthButton type="submit">Log in</AuthButton>
    </form>
  );
};

export default KeyLogin;
