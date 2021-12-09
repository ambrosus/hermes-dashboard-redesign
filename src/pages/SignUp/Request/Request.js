import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import AuthInput from '../../../components/auth/AuthInput';
import AuthTextarea from '../../../components/auth/AuthTextarea';
import AuthCheckbox from '../../../components/auth/AuthCheckbox';
import AuthButton from '../../../components/auth/AuthButton';
import successImg from '../../../assets/raster/success.svg';

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
      .post(
        'https://vitalii427-hermes.ambrosus-test.io/organization/request',
        formData,
      )
      .then(({ data }) => {
        if (data.meta && data.meta.code === 201) {
          setIsRegisterSuccess(true);
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
      <h1>Thank you!</h1>
      <p>
        Your application has been successfully submitted for approval.
        <br />
        Once reviewed, we will send you an email with further instructions.
      </p>
    </div>
  ) : (
    <div className="auth-request">
      <h1>Almost done</h1>
      <p>For better customer experience please share a few more details.</p>
      <form className="auth-request__form" onSubmit={signUp}>
        <AuthInput onChange={handleOrganization} label="organization name" />
        <AuthInput
          errorMessage={emailError}
          onChange={handleEmail}
          label="your email*"
        />
        <AuthTextarea
          onChange={handleMessage}
          label="What makes you interested in our solution? *"
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
