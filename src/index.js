import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Web3 from 'web3';
import Modal from 'react-modal';
import Main from './Main';
import configureStore from './store';

Modal.setAppElement('#root');

const store = configureStore();

window.web3 = new Web3(
  Web3.givenProvider || 'ws://some.local-or-remote.node:8546',
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Main />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
