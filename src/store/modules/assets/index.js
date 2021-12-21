import {
  SET_ASSETS_LIST_DATA,
  SET_ASSETS_LOADING,
  SET_ASSETS_QUERY_DATA,
  SET_ASSETS_SEARCH_PARAMS,
  SET_CREATE_ASSET_RESULT,
  SET_CREATE_EVENT_RESULT,
  SET_EVENTS_DATA,
} from './constants';

const defaultState = {
  assetsList: [],
  assetsQueryData: {
    data: [],
    pagination: {},
  },
  eventsList: {},
  createAssetResult: null,
  createEventResult: null,
  assetsSearchParams: [],
  isAssetsLoading: false,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_ASSETS_QUERY_DATA:
      return { ...state, assetsQueryData: payload };
    case SET_ASSETS_LIST_DATA:
      return {
        ...state,
        assetsList:
          state.assetsList.length === 1 || !payload.length
            ? payload
            : [...state.assetsList, ...payload],
      };
    case SET_EVENTS_DATA:
      return { ...state, eventsList: payload };
    case SET_CREATE_ASSET_RESULT:
      return { ...state, createAssetResult: payload };
    case SET_CREATE_EVENT_RESULT:
      return { ...state, createEventResult: payload };
    case SET_ASSETS_SEARCH_PARAMS:
      return { ...state, assetsSearchParams: payload };
    case SET_ASSETS_LOADING:
      return { ...state, isAssetsLoading: payload };
    default:
      return state;
  }
};
