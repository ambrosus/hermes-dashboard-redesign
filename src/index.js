import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Web3 from 'web3';
import Modal from 'react-modal';
import Main from './Main';
import configureStore from './store';
import generateToken from './utils/generateToken';

Modal.setAppElement('#root');

const store = configureStore();

window.web3 = new Web3(
  Web3.givenProvider || 'ws://some.local-or-remote.node:8546',
);
const key = sessionStorage.getItem('user_public_key');
if (key) {
  const token = generateToken(key);

  axios.defaults.headers.common = {
    Authorization: `AMB_TOKEN ${token}`,
    'Content-Type': 'application/json',
  };
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Main />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
