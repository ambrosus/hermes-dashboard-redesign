import React, { useEffect } from 'react';
import axios from 'axios';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setInviteAddress } from '../../store/modules/auth/actions';
import generateMyKeyIcon from '../../assets/svg/generate-my-key.svg';
import regMyKeyIcon from '../../assets/svg/reg-my-key.svg';
import { environment } from '../../utils/environment';
import { handleModal } from '../../store/modules/modal';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (history.location.search) {
      const splittedQuery = history.location.search.split('=');

      if (splittedQuery[0].includes('inviteId')) {
        axios
          .get(
            `${environment.api.extended}/organization/invite/${splittedQuery[1]}/exists`,
          )
          .then(() => dispatch(setInviteAddress(splittedQuery[1])))
          .catch(() => history.push('/dashboard/login'));
      }
    }
  });
  const showImportantInfo = () =>
    dispatch(handleModal({ name: 'importantInfoModal' }));

  return (
    <>
      <div className="sign-up">
        <h1 className="sign-up__heading">Registration</h1>
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
          <Link to="/dashboard/signup/own-key">
            <div className="sign-up-choose__key">
              <div className="circle" />
              <div className="text">
                <div className="primary"> Register your public key</div>
                <div className="secondary">
                  {' '}
                  We will register your public key (also known as address)
                </div>
              </div>
              <div className="icon">
                <ReactSVG src={regMyKeyIcon} wrapper="span" />{' '}
              </div>
            </div>
          </Link>
          <div
            className="sign-up-choose__key"
            role="presentation"
            onClick={showImportantInfo}
          >
            <div className="circle" />
            <div className="text">
              <div className="primary"> Generate new keys</div>
              <div className="secondary">
                {' '}
                Keys will be generated locally on your device/browser.
              </div>
            </div>
            <div className="icon">
              <ReactSVG src={generateMyKeyIcon} wrapper="span" />{' '}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
