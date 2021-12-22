import axios from 'axios';
import { SET_ETH_ADDRESS, SIGN_IN } from './constants';
import { generateToken } from '../../../utils/generateToken';

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
    .get(
      `https://vitalii427-hermes.ambrosus-test.io/account/${account.address}`,
    )
    .then(({ data }) => {
      if (data.meta && data.meta.code === 200) {
        dispatch({
          type: SIGN_IN,
          payload: { ...data.data, publicKey: account.address },
        });
        sessionStorage.setItem('user_private_key', privateKey);
      }
    });
};
