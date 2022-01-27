import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DashboardFooter from '../Dashboard/Footer';
import DashboardHeader from '../Dashboard/Header';
import AuthFooter from '../Auth/Footer';

const Layout = (props) => {
  const { children } = props;
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <div className={cx('layout', !isAuth ? 'layout--auth' : '')}>
      <DashboardHeader />
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
