import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import key from '../../assets/raster/auth-key.png';
import keyGen from '../../assets/raster/auth-key-generate.png';
import AuthButton from '../../components/auth/AuthButton';
import { setInviteAddress } from '../../store/modules/auth/actions';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (history.location.search) {
      const splittedQuery = history.location.search.split('=');

      if (splittedQuery[0].includes('inviteId')) {
        axios
          .get(
            `https://vitalii427-hermes.ambrosus-test.io/organization/invite/${splittedQuery[1]}/exists`,
          )
          .then(() => dispatch(setInviteAddress(splittedQuery[1])))
          .catch(() => history.push('/dashboard/login'));
      }
    }
  });

  return (
    <div className="sign-up">
      <h1>Registration</h1>
      <p>
        Public/private key pair is required to access the blockchain and
        complete transactions.
      </p>
      <p style={{ marginTop: 20 }}>
        You are free to either register your own key or use our secure key
        generator. <br />
        Don’t worry, in either case, <b>we do not store your private key</b>.
      </p>
      <div className="sign-up-choose">
        <div className="sign-up-choose__key">
          <img src={key} alt="key" className="sign-up-choose__img" />
          <Link to="/dashboard/signup/own-key">
            <AuthButton>Register my own key</AuthButton>
          </Link>
        </div>
        <span className="sign-up-choose__separator">or</span>
        <div className="sign-up-choose__key">
          <img
            src={keyGen}
            alt="key generator"
            className="sign-up-choose__img"
          />
          <Link to="/dashboard/signup/generated-key">
            <AuthButton plain>Generate keys for me</AuthButton>
          </Link>
        </div>
      </div>
      <Link to="/dashboard/login" className="auth-page__link">
        Already a user?
      </Link>
    </div>
  );
};

export default SignUp;
