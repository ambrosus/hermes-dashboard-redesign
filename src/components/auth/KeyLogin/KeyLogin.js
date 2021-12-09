import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Tooltip from 'react-simple-tooltip';
import AuthInput from '../AuthInput';
import AuthButton from '../AuthButton';
import { signIn } from '../../../store/modules/auth/actions';

const KeyLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    if (isAuth) {
      history.push('/dashboard/assets/');
    }
  }, [isAuth]);

  const signInUser = (e) => {
    e.preventDefault();
    dispatch(signIn(privateKey));
  };

  return (
    <form className="key-login" onSubmit={signInUser}>
      <AuthInput
        onChange={setPrivateKey}
        label="your private key"
        className="key-login__input"
        rightEl={
          <Tooltip content="asdfasdfaf">
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
