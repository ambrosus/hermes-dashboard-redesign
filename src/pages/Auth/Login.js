import React from 'react';
import { Link } from 'react-router-dom';
import KeyLogin from '../../components/auth/KeyLogin';

const Login = () => (
  <div className="auth-page">
    <KeyLogin />
    <Link to="/dashboard/signup" className="auth-page__link">
      Register an account
    </Link>
  </div>
);

export default Login;
