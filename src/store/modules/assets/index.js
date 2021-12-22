import {
  SET_ASSETS_LIST_DATA,
  SET_ASSETS_LOADING,
  SET_ASSETS_QUERY_DATA,
  SET_ASSETS_SEARCH_PARAMS,
  SET_CREATE_RESULT,
  SET_EVENTS_DATA,
} from './constants';
import { isEmptyObj } from '../../../utils/isEmptyObj';

const defaultState = {
  assetsList: [],
  assetsQueryData: {
    data: [],
    pagination: {},
  },
  eventsList: {},
  createResult: {
    resultData: [],
    percentsComplete: 0,
  },
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
    case SET_CREATE_RESULT:
      return {
        ...state,
        createResult: {
          resultData: !isEmptyObj(payload.resultData)
            ? [...state.createResult.resultData, payload.resultData]
            : [],
          percentsComplete: payload.percentsComplete,
        },
      };
    case SET_ASSETS_SEARCH_PARAMS:
      return { ...state, assetsSearchParams: payload };
    case SET_ASSETS_LOADING:
      return { ...state, isAssetsLoading: payload };
    default:
      return state;
  }
};
