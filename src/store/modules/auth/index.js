import { SET_ETH_ADDRESS, SIGN_IN } from './constants';

const defaultState = {
  isAuth: !!sessionStorage.getItem('user_public_key'),
  etherAddress: {
    privateKey: '',
    publicKey: '',
  },
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_ETH_ADDRESS:
      return { ...state, etherAddress: payload };
    case SIGN_IN:
      return { ...state, isAuth: true };
    default:
      return state;
  }
};
