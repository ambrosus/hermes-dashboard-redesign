import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BackBtn from '../../../components/auth/BackBtn';
import spyCam from '../../../assets/raster/spy-cam.png';
import spyPerson from '../../../assets/raster/spy-person.png';
import AuthButton from '../../../components/auth/AuthButton';
import GenerateKeyForm from '../../../components/auth/GenerateKeyForm';
import { handleModal } from '../../../store/modules/modal';

const GeneratedKey = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const setFormVisible = () => setIsFormVisible(true);
  const dispatch = useDispatch();
  const openModal = () => dispatch(handleModal({ name: 'secureKeys' }));

  return (
    <div className="generated-key">
      {isFormVisible ? (
        <GenerateKeyForm />
      ) : (
        <>
          <BackBtn />
          <h1>Generate new keys</h1>
          <div className="generated-key-info">
            <h3 className="generated-key-info__title">important information</h3>
            <img
              className="generated-key-info__img"
              src={spyCam}
              alt="spy cam"
            />
            <img
              className="generated-key-info__img"
              src={spyPerson}
              alt="spy person"
            />
            <p>
              The keys provide access to your account.
              <br />
              Be diligent to keep your private key safe.
            </p>
            <p>
              Do NOT lose it! It cannot be recovered if you do.
              <br />
              Do NOT share it! Your account may be misused.
              <br />
              Create a backup.
            </p>
            <button
              onClick={openModal}
              className="auth-page__link"
              type="button"
            >
              How to secure the keys?
            </button>
          </div>
          <AuthButton onClick={setFormVisible}>I Understands</AuthButton>
        </>
      )}
    </div>
  );
};

export default GeneratedKey;
