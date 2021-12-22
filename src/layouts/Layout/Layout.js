import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DashboardFooter from '../Dashboard/Footer';
import DashboardHeader from '../Dashboard/Header';
import AuthFooter from '../Auth/Footer';
import AuthHeader from '../Auth/Header';

const Layout = (props) => {
  const { children } = props;
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <div className={cx('layout', !isAuth ? 'layout--auth' : '')}>
      {isAuth ? <DashboardHeader /> : <AuthHeader />}
      <main className="content">
        <div className="page">{children}</div>
      </main>
      {isAuth ? <DashboardFooter /> : <AuthFooter />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.array,
};

export default Layout;
