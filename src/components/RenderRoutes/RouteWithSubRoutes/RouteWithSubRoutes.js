import React from 'react';
import { Route, Redirect } from 'react-router';

export const RouteWithSubRoutes = (route) => {
  const { path, exact, routes, isNotAuthAllowed, isAuth } = route;
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAuth || isNotAuthAllowed ? (
          <route.component {...props} routes={routes} />
        ) : (
          <Redirect to={{ pathname: '/dashboard/login' }} />
        )
      }
    />
  );
};

export default RouteWithSubRoutes;
