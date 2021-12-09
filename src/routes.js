import React from 'react';

import Assets from './pages/Dashboard/Assets';
import Asset from './pages/Dashboard/Assets/Asset';
import Event from './pages/Dashboard/Assets/Event';
import Login from './pages/Auth';
import SignUp from './pages/SignUp';
import OwnKey from './pages/SignUp/OwnKey';
import Request from './pages/SignUp/Request';
import GeneratedKey from './pages/SignUp/GeneratedKey';

const routes = [
  {
    path: '/dashboard/assets',
    key: 'ROOT',
    exact: true,
    component: () => <Assets />,
  },
  {
    path: '/dashboard/assets/:assetId',
    key: 'ROOT',
    exact: true,
    component: () => <Asset />,
  },
  {
    path: '/dashboard/assets/:assetId/events/:eventId',
    key: 'ROOT',
    exact: true,
    component: () => <Event />,
  },
  {
    path: '/dashboard/login',
    key: 'ROOT',
    isNotAuthAllowed: true,
    exact: true,
    component: () => <Login />,
  },
  {
    path: '/dashboard/signup',
    key: 'ROOT',
    isNotAuthAllowed: true,
    exact: true,
    component: () => <SignUp />,
  },
  {
    path: '/dashboard/signup/own-key',
    key: 'ROOT',
    isNotAuthAllowed: true,
    exact: true,
    component: () => <OwnKey />,
  },
  {
    path: '/dashboard/signup/request',
    key: 'ROOT',
    isNotAuthAllowed: true,
    exact: true,
    component: () => <Request />,
  },
  {
    path: '/dashboard/signup/generated-key',
    key: 'ROOT',
    isNotAuthAllowed: true,
    exact: true,
    component: () => <GeneratedKey />,
  },
];

export default routes;
