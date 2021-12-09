import React from 'react';
import { Link } from 'react-router-dom';
import loginLogo from '../../../assets/raster/login-logo.png';

const Header = () => (
  <div className="header-auth">
    <Link to="/dashboard/login">
      <img className="header-auth__logo" src={loginLogo} alt="login-logo" />
    </Link>
  </div>
);

export default Header;
