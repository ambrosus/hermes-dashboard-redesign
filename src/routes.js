import React from 'react';

import Assets from './pages/Dashboard/Assets';
import Package from './pages/Dashboard/Package';
import Organization from './pages/Dashboard/Organization';
import Node from './pages/Dashboard/Node';
import Asset from './pages/Dashboard/Assets/Asset';
import Event from './pages/Dashboard/Assets/Event';
import Login from './pages/Auth';
import SignUp from './pages/SignUp';
import OwnKey from './pages/SignUp/OwnKey';
import Request from './pages/SignUp/Request';
import GeneratedKey from './pages/SignUp/GeneratedKey';
import Search from './pages/Dashboard/Assets/Search';

const routes = [
  {
    path: '/dashboard/assets',
    key: 'ROOT',
    exact: true,
    component: () => <Assets />,
  },
  {
    path: '/dashboard/assets/search',
    key: 'ROOT',
    exact: true,
    component: () => <Search />,
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
    path: '/dashboard/package',
    key: 'ROOT',
    exact: true,
    component: () => <Package />,
  },
  {
    path: '/dashboard/organization',
    key: 'ROOT',
    exact: true,
    component: () => <Organization />,
  },
  {
    path: '/dashboard/node',
    key: 'ROOT',
    exact: true,
    component: () => <Node />,
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
