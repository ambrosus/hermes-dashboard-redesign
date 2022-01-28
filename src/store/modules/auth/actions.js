import axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { SET_ETH_ADDRESS, SET_INVITE_ADDRESS, SIGN_IN } from './constants';
import { generateToken } from '../../../utils/generateToken';
import { environment } from '../../../utils/environment';

export const setEthAddress = () => {
  const address = window.web3.eth.accounts.create();
  return {
    type: SET_ETH_ADDRESS,
    payload: {
      privateKey: address.privateKey,
      publicKey: address.address,
    },
  };
};

export const setPublicKeyAction = (publicKey) => ({
  type: SET_ETH_ADDRESS,
  payload: {
    privateKey: '',
    publicKey,
  },
});

export const signIn = (privateKey) => (dispatch) => {
  const token = generateToken(privateKey);

  axios.defaults.headers.common = {
    Authorization: `AMB_TOKEN ${token}`,
    'Content-Type': 'application/json',
  };

  const account = window.web3.eth.accounts.privateKeyToAccount(privateKey);
  axios
    .get(`${environment.api.extended}/account/${account.address}`)
    .then(({ data }) => {
      if (data.meta && data.meta.code === 200) {
        dispatch({
          type: SIGN_IN,
          payload: { ...data.data, publicKey: account.address },
        });
        sessionStorage.setItem('user_account', JSON.stringify(data.data));
        sessionStorage.setItem('user_private_key', privateKey);
      }
    })
    .catch(() => {
      NotificationManager.error('Sign in error');
    });
};

export const setInviteAddress = (payload) => ({
  type: SET_INVITE_ADDRESS,
  payload,
});
