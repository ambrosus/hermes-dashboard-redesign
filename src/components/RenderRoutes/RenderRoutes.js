import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import PropTypes from 'prop-types';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const RenderRoutes = (props) => {
  const { routes } = props;
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} isAuth={isAuth} />
      ))}
      <Route
        render={() =>
          isAuth ? (
            <h1>Page not found!</h1>
          ) : (
            <Redirect to={{ pathname: '/dashboard/login' }} />
          )
        }
      />
    </Switch>
  );
};

RenderRoutes.propTypes = {
  routes: PropTypes.array,
};

export default RenderRoutes;
