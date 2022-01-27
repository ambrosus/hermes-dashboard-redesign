import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import regMyKeyIcon from '../../assets/svg/reg-my-key.svg';
import generateMyKeyIcon from '../../assets/svg/generate-my-key.svg';

const SignUp = () => (
  <div className="sign-up">
    <h1 className="sign-up__heading">Registration</h1>
    <p>
      Public/private key pair is required to access the blockchain and complete
      transactions.
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
      <Link to="/dashboard/signup/generated-key">
        <div className="sign-up-choose__key">
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
      </Link>
    </div>
  </div>
);

export default SignUp;
