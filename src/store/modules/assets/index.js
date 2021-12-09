import {
  SET_ASSETS_LIST_DATA,
  SET_ASSETS_QUERY_DATA,
  SET_EVENTS_DATA,
} from './constants';

const defaultState = {
  assetsList: [],
  assetsQueryData: {
    data: [],
    pagination: {},
  },
  eventsList: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_ASSETS_QUERY_DATA:
      return { ...state, assetsQueryData: payload };
    case SET_ASSETS_LIST_DATA:
      return {
        ...state,
        assetsList:
          state.assetsList.length === 1
            ? payload
            : [...state.assetsList, ...payload],
      };
    case SET_EVENTS_DATA:
      return { ...state, eventsList: payload };
    default:
      return state;
  }
};
