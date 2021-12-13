const moduleName = 'modal';

const OPEN_MODAL = `${moduleName}/OPEN_MODAL`;

const defaultState = {
  openedModal: {
    name: '',
    data: null,
  },
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      return { ...state, openedModal: payload };
    default:
      return state;
  }
};

export const handleModal = (modalData) => ({
  type: OPEN_MODAL,
  payload: modalData || {
    name: '',
    data: null,
  },
});
