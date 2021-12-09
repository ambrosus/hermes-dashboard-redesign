const moduleName = 'modal';

const OPEN_MODAL = `${moduleName}/OPEN_MODAL`;

const defaultState = {
  openedModal: '',
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      return { ...state, openedModal: payload };
    default:
      return state;
  }
};

export const handleModal = (modalName) => ({
  type: OPEN_MODAL,
  payload: modalName,
});
