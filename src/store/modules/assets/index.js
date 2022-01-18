import {
  SET_ASSETS_LIST_DATA,
  SET_ASSETS_LOADING,
  SET_ASSETS_QUERY_DATA,
  SET_ASSETS_SEARCH_PARAMS,
  SET_CREATE_RESULT,
  SET_EVENTS_DATA,
  UNSHIFT_ASSETS_LIST_DATA,
  UNSHIFT_EVENTS_LIST_DATA,
  SET_ASSET_PAGE_INFO,
  SET_SEARCHED_ASSETS_LIST,
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
  assetPageInfo: null,
  searchedAssetsList: [],
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_ASSETS_QUERY_DATA:
      return { ...state, assetsQueryData: payload };
    case SET_ASSETS_LIST_DATA:
      return {
        ...state,
        assetsList: payload.length ? [...state.assetsList, ...payload] : [],
      };
    case UNSHIFT_ASSETS_LIST_DATA:
      return { ...state, assetsList: [payload].concat(state.assetsList) };
    case UNSHIFT_EVENTS_LIST_DATA:
      return { ...state, eventsList: [payload].concat(state.eventsList) };
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
    case SET_ASSET_PAGE_INFO:
      return { ...state, assetPageInfo: payload };
    case SET_SEARCHED_ASSETS_LIST:
      return { ...state, searchedAssetsList: payload };
    default:
      return state;
  }
};
