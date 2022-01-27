import { SET_ETH_ADDRESS, SET_INVITE_ADDRESS, SIGN_IN } from './constants';

const defaultState = {
  isAuth: !!sessionStorage.getItem('user_private_key'),
  etherAddress: {
    privateKey: '',
    publicKey: '',
  },
  userInfo: {},
  inviteAddress: '',
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_ETH_ADDRESS:
      return { ...state, etherAddress: payload };
    case SIGN_IN:
      return { ...state, isAuth: true, userInfo: payload };
    case SET_INVITE_ADDRESS:
      return { ...state, inviteAddress: payload };
    default:
      return state;
  }
};
