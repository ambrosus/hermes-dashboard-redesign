import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import BackBtn from '../../../components/auth/BackBtn';
import AuthButton from '../../../components/auth/AuthButton';
import GenerateKeyForm from '../../../components/auth/GenerateKeyForm';
import importantInfo from '../../../assets/svg/important-info.svg';

const GeneratedKey = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const setFormVisible = () => setIsFormVisible(true);

  return (
    <div style={{ background: !isFormVisible && 'rgba(0, 0, 0, 0.6)' }}>
      <div className="generated-key">
        {isFormVisible ? (
          <GenerateKeyForm />
        ) : (
          <>
            <BackBtn />
            <div className="generated-key-info">
              <div className="generated-key-info__top-image">
                <ReactSVG src={importantInfo} wrapper="span" />
              </div>
              <h3 className="generated-key-info__title">
                important information
              </h3>
              <p>
                The keys provide access to your account.
                <br />
                Be diligent to keep your private key safe.
              </p>
              <p>
                <span className="do-not">Do NOT</span>&nbsp;&nbsp;lose it! It
                cannot be recovered if you do.
                <br />
                <span className="do-not">Do NOT</span>&nbsp;&nbsp;share it! Your
                account may be misused.
                <br />
                Create a backup.
              </p>
              <AuthButton className="important-btn" onClick={setFormVisible}>
                I Understands
              </AuthButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneratedKey;
