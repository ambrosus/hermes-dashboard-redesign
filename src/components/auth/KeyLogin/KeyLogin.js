/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';
import cx from 'classnames';
import AuthInput from '../AuthInput';
import AuthButton from '../AuthButton';
import { signIn } from '../../../store/modules/auth/actions';
import { Link } from 'react-router-dom';
import Tooltip from 'react-simple-tooltip';
import axios from 'axios';
import decryptPrivateKey from '../../../utils/decryptPassword';
import { environment } from '../../../utils/environment';

const EMAIL_ADDRESS = 'Email address';
const PRIVATE_KEY = 'Private key';
const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const KeyLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth, userInfo } = useSelector((state) => state.auth);
  const [authMethod, setAuthMethod] = useState(PRIVATE_KEY);
  const [privateKey, setPrivateKey] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuth) {
      if (userInfo.permissions?.includes('super_account')) {
        history.push('/dashboard/node');
      } else {
        history.push('/dashboard/assets/');
      }
    }
  }, [isAuth]);

  const signInUser = (e) => {
    e.preventDefault();
    if (authMethod === PRIVATE_KEY) {
      if (privateKey.length === 66) {
        dispatch(signIn(privateKey));
      } else {
        NotificationManager.error('Incorrect key');
      }
    } else {
      axios.post(`${environment.api.extended}/account/secret`, { email })
        .then((response) => {
          console.log(response.data.data.token);
          const [address, privateKey] = decryptPrivateKey(
            JSON.parse(atob(response.data.data.token)),
            password,
          );

          if (!address) {
            NotificationManager.error('Incorrect password');
          } else {
            dispatch(signIn(privateKey));
          }
        })
        .catch((err) => {
          NotificationManager.error(err.response?.data?.meta?.message);
        })
    }
  };

  const isLoginDisabled = authMethod === PRIVATE_KEY && !privateKey || (
    authMethod === EMAIL_ADDRESS && (
      !email || !mailFormat.test(email) || !password
    )
  );

  return (
    <div className="key-login-container">
      <p className="key-login-container__heading">Hi, Welcome Back!</p>
      <p className="key-login-container__secondary">
        {' '}
        Welcome back! Sign in with your email address. mail or private key
      </p>
      <div className="controls-auth">
        <button
          className={cx(authMethod === EMAIL_ADDRESS && 'active')}
          onClick={() => setAuthMethod(EMAIL_ADDRESS)}
        >
          {EMAIL_ADDRESS}
        </button>
        <button
          className={cx(authMethod === PRIVATE_KEY && 'active')}
          onClick={() => setAuthMethod(PRIVATE_KEY)}
        >
          {PRIVATE_KEY}
        </button>
      </div>
      <form className="key-login" onSubmit={signInUser}>
        {authMethod === PRIVATE_KEY ? (
          <AuthInput
            onChange={setPrivateKey}
            label="Your private key"
            className="key-login__input"
            placeholder="Enter key here"
            rightEl={
              <Tooltip
                background="white"
                color="white"
                content="For maximum security, your private key will never leave your browser."
                fontSize="13px"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.747 9.41506 20.7188 6.93684 18.891 5.10901C17.0632 3.28118 14.5849 2.25299 12 2.25ZM11.9999 6.75C12.2224 6.75 12.4399 6.81598 12.6249 6.9396C12.8099 7.06321 12.9541 7.23891 13.0393 7.44448C13.1244 7.65005 13.1467 7.87625 13.1033 8.09448C13.0599 8.31271 12.9527 8.51316 12.7954 8.6705C12.6381 8.82783 12.4376 8.93498 12.2194 8.97838C12.0012 9.02179 11.775 8.99951 11.5694 8.91436C11.3638 8.82922 11.1881 8.68502 11.0645 8.50002C10.9409 8.31501 10.8749 8.0975 10.8749 7.875C10.8749 7.72726 10.904 7.58097 10.9605 7.44448C11.0171 7.30799 11.1 7.18397 11.2044 7.0795C11.3089 6.97504 11.4329 6.89217 11.5694 6.83563C11.7059 6.7791 11.8522 6.75 11.9999 6.75H11.9999ZM12.75 17.25H12C11.9015 17.2501 11.8039 17.2307 11.7129 17.193C11.6219 17.1554 11.5392 17.1001 11.4695 17.0305C11.3999 16.9608 11.3447 16.8781 11.307 16.7871C11.2693 16.6961 11.2499 16.5985 11.25 16.5V12C11.0511 12 10.8603 11.921 10.7197 11.7803C10.579 11.6397 10.5 11.4489 10.5 11.25C10.5 11.0511 10.579 10.8603 10.7197 10.7197C10.8603 10.579 11.0511 10.5 11.25 10.5H12C12.0985 10.4999 12.1961 10.5193 12.2871 10.557C12.3781 10.5946 12.4608 10.6499 12.5305 10.7195C12.6001 10.7892 12.6554 10.8719 12.693 10.9629C12.7307 11.0539 12.7501 11.1515 12.75 11.25V15.75C12.9489 15.75 13.1397 15.829 13.2803 15.9697C13.421 16.1103 13.5 16.3011 13.5 16.5C13.5 16.6989 13.421 16.8897 13.2803 17.0303C13.1397 17.171 12.9489 17.25 12.75 17.25Z"
                    fill="#CFD6E4"
                  />
                </svg>
              </Tooltip>
            }
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
        ) : (
          <>
            <AuthInput
              onChange={setEmail}
              label="Email"
              className="key-login__input"
              placeholder="Enter email here"
              leftEl={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    stroke="#CFD6E4"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 7.99999V13C16 13.7956 16.3161 14.5587 16.8787 15.1213C17.4413 15.6839 18.2044 16 19 16C19.7957 16 20.5587 15.6839 21.1213 15.1213C21.6839 14.5587 22 13.7956 22 13V12C21.9999 9.74302 21.2362 7.55247 19.8333 5.78452C18.4303 4.01658 16.4706 2.77521 14.2726 2.26229C12.0747 1.74936 9.76794 1.99503 7.72736 2.95936C5.68677 3.92368 4.03241 5.54995 3.03327 7.57371C2.03413 9.59748 1.74898 11.8997 2.22418 14.1061C2.69938 16.3125 3.90699 18.2932 5.65064 19.7263C7.39429 21.1593 9.57144 21.9603 11.8281 21.9991C14.0847 22.0379 16.2881 21.3122 18.08 19.94"
                    stroke="#CFD6E4"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              }
            />
            {email && !mailFormat.test(email) && (
              <span
                className="error-message"
                style={{ color: 'red', marginTop: 5, display: 'block' }}
              >
                Incorrect email
              </span>
            )}
            <AuthInput
              onChange={setPassword}
              label="Password"
              type="password"
              className="key-login__input"
              placeholder="Password"
              rightEl={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.1853 11.6954C23.1524 11.6213 22.3585 9.86011 20.5928 8.09433C18.2412 5.74243 15.2698 4.49924 12 4.49924C8.73017 4.49924 5.75874 5.74243 3.40711 8.09433C1.64142 9.86011 0.847573 11.6213 0.814613 11.6954C0.772012 11.7913 0.75 11.895 0.75 12C0.75 12.1049 0.772012 12.2087 0.814613 12.3046C0.847573 12.3787 1.64152 14.1395 3.4072 15.905C5.75883 18.2563 8.73017 19.4992 12 19.4992C15.2698 19.4992 18.2411 18.2563 20.5928 15.905C22.3584 14.1395 23.1524 12.3787 23.1853 12.3046C23.2279 12.2087 23.25 12.1049 23.25 12C23.25 11.895 23.2279 11.7913 23.1853 11.6954V11.6954ZM12 8.62506C12.6675 8.62506 13.32 8.823 13.875 9.19385C14.43 9.5647 14.8626 10.0918 15.1181 10.7085C15.3735 11.3252 15.4404 12.0038 15.3101 12.6585C15.1799 13.3132 14.8585 13.9145 14.3865 14.3865C13.9145 14.8585 13.3131 15.18 12.6584 15.3102C12.0037 15.4404 11.3251 15.3736 10.7084 15.1182C10.0917 14.8627 9.56462 14.4301 9.19377 13.8751C8.82292 13.3201 8.62498 12.6676 8.62498 12.0001C8.62598 11.1053 8.98189 10.2474 9.6146 9.61469C10.2473 8.98197 11.1052 8.62607 12 8.62506V8.62506Z"
                    fill="#CFD6E4"
                  />
                </svg>
              }
              leftEl={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 13C11.7348 13 11.4804 13.1054 11.2929 13.2929C11.1054 13.4804 11 13.7348 11 14V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V14C13 13.7348 12.8946 13.4804 12.7071 13.2929C12.5196 13.1054 12.2652 13 12 13ZM17 9V7C17 5.67392 16.4732 4.40215 15.5355 3.46447C14.5979 2.52678 13.3261 2 12 2C10.6739 2 9.40215 2.52678 8.46447 3.46447C7.52678 4.40215 7 5.67392 7 7V9C6.20435 9 5.44129 9.31607 4.87868 9.87868C4.31607 10.4413 4 11.2044 4 12V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V12C20 11.2044 19.6839 10.4413 19.1213 9.87868C18.5587 9.31607 17.7956 9 17 9ZM9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4C12.7956 4 13.5587 4.31607 14.1213 4.87868C14.6839 5.44129 15 6.20435 15 7V9H9V7ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V12C6 11.7348 6.10536 11.4804 6.29289 11.2929C6.48043 11.1054 6.73478 11 7 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12V19Z"
                    fill="#CFD6E4"
                  />
                </svg>
              }
            />
          </>
        )}
        <AuthButton type="submit" disabled={isLoginDisabled}>
          Log in
        </AuthButton>
      </form>
      <p className="have-account-text">
        I don&apos;t have an account&nbsp;&nbsp;
        <span>
          <Link to="/dashboard/signup" className="auth-page__link">
            Create Account
          </Link>
        </span>
      </p>
    </div>
  );
};

export default KeyLogin;
