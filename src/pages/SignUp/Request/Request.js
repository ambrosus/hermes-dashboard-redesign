import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import AuthInput from '../../../components/auth/AuthInput';
import AuthTextarea from '../../../components/auth/AuthTextarea';
import AuthCheckbox from '../../../components/auth/AuthCheckbox';
import AuthButton from '../../../components/auth/AuthButton';
import successImg from '../../../assets/svg/success-register.svg';
import { environment } from '../../../utils/environment';

const Request = () => {
  const history = useHistory();
  const address = useSelector((state) => state.auth.etherAddress.publicKey);

  if (!address) {
    history.push('/dashboard/signup');
  }
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    title: '',
    address,
  });

  useEffect(() => {
    const { email, message, title } = formData;

    setIsSubmitDisabled(
      !email || !message || !title || !checkboxValue || !!emailError,
    );
  }, [formData, checkboxValue]);

  const signUp = (e) => {
    e.preventDefault();

    axios
      .post(`${environment.api.extended}/organization/request`, formData)
      .then(({ data }) => {
        if (data.meta && data.meta.code === 201) {
          setIsRegisterSuccess(true);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          NotificationManager.error(err.response.data.meta.message);
        }
      });
  };

  const handleCheckbox = () => setCheckboxValue(!checkboxValue);
  const handleOrganization = (title) => setFormData({ ...formData, title });
  const handleMessage = (message) => setFormData({ ...formData, message });
  const handleEmail = (email) => {
    setFormData({ ...formData, email });

    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    setEmailError(!email.match(mailFormat) ? 'Email is invalid' : '');
  };

  return isRegisterSuccess ? (
    <div className="success-registration">
      <img
        className="success-registration__img"
        src={successImg}
        alt="success"
      />
      <h1 className="success-registration__heading">Thank you!</h1>
      <p className="success-registration__secondary">
        Your application has been successfully submitted for approval.
        <br />
        Once reviewed, we will send you an email with further instructions.
      </p>
      <AuthButton
        onClick={() => history.push('/dashboard/login')}
        type="submit"
      >
        Log in
      </AuthButton>
    </div>
  ) : (
    <div className="auth-request">
      <h1 className="auth-request__heading">Almost done</h1>
      <p className="auth-request__secondary">
        For better customer experience please share a few more details.
      </p>
      <form className="auth-request__form" onSubmit={signUp}>
        <AuthInput
          leftEl={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2495 19.4994V14.9993C14.2495 14.8004 14.1704 14.6096 14.0298 14.469C13.8891 14.3283 13.6984 14.2493 13.4995 14.2493H10.4995C10.3005 14.2493 10.1098 14.3283 9.96912 14.469C9.82847 14.6096 9.74945 14.8004 9.74945 14.9993V19.4994C9.74945 19.6983 9.67045 19.889 9.52981 20.0297C9.38918 20.1703 9.19844 20.2494 8.99954 20.2494L4.50009 20.25C4.40159 20.25 4.30406 20.2306 4.21305 20.1929C4.12205 20.1552 4.03936 20.1 3.9697 20.0303C3.90005 19.9607 3.8448 19.878 3.8071 19.787C3.7694 19.696 3.75 19.5985 3.75 19.5V10.8318C3.75 10.7273 3.77183 10.624 3.8141 10.5284C3.85637 10.4329 3.91814 10.3472 3.99545 10.2769L11.4949 3.45803C11.633 3.3325 11.8129 3.26295 11.9995 3.26294C12.186 3.26293 12.3659 3.33248 12.504 3.45799L20.0045 10.2769C20.0818 10.3472 20.1436 10.4329 20.1859 10.5284C20.2282 10.624 20.25 10.7274 20.25 10.8319V19.5C20.25 19.5985 20.2306 19.696 20.1929 19.787C20.1552 19.878 20.1 19.9607 20.0303 20.0304C19.9606 20.1 19.878 20.1552 19.7869 20.1929C19.6959 20.2306 19.5984 20.25 19.4999 20.25L14.9994 20.2494C14.8005 20.2494 14.6097 20.1703 14.4691 20.0297C14.3285 19.889 14.2494 19.6983 14.2495 19.4994V19.4994Z"
                stroke="#CFD6E4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          onChange={handleOrganization}
          label="Organization name*"
          placeholder="Organization name"
        />
        <AuthInput
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 8.00011V13.0001C16 13.7958 16.3161 14.5588 16.8787 15.1214C17.4413 15.684 18.2044 16.0001 19 16.0001C19.7957 16.0001 20.5587 15.684 21.1213 15.1214C21.6839 14.5588 22 13.7958 22 13.0001V12.0001C21.9999 9.74314 21.2362 7.55259 19.8333 5.78464C18.4303 4.0167 16.4706 2.77534 14.2726 2.26241C12.0747 1.74948 9.76794 1.99515 7.72736 2.95948C5.68677 3.9238 4.03241 5.55007 3.03327 7.57383C2.03413 9.5976 1.74898 11.8998 2.22418 14.1062C2.69938 16.3126 3.90699 18.2933 5.65064 19.7264C7.39429 21.1594 9.57144 21.9605 11.8281 21.9993C14.0847 22.0381 16.2881 21.3124 18.08 19.9401"
                stroke="#CFD6E4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          placeholder="Enter email here"
          errorMessage={emailError}
          onChange={handleEmail}
          label="Email*"
        />
        <AuthTextarea
          onChange={handleMessage}
          label="What makes you interested in our solution?*"
          placeholder="What makes you interested in our solution?"
        />
        <AuthCheckbox
          onChange={handleCheckbox}
          checked={checkboxValue}
          className="auth-request__checkbox"
          label={
            <>
              I`ve read{' '}
              <a href="/" className="auth-page__link">
                Terms of Service
              </a>
            </>
          }
        />
        <AuthButton
          type="submit"
          className="auth-request__submit"
          disabled={isSubmitDisabled}
        >
          Register
        </AuthButton>
      </form>
    </div>
  );
};

export default Request;
