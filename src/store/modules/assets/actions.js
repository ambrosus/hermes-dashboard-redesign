import axios from 'axios';
import {
  SET_ASSETS_LIST_DATA,
  SET_ASSETS_QUERY_DATA,
  SET_EVENTS_DATA,
} from './constants';

export const fetchAssets =
  (next = '') =>
  (dispatch) => {
    const params = {
      limit: 15,
      next,
      query: [
        {
          field: 'organizationId',
          operator: 'equal',
          value: 9,
        },
      ],
    };

    return new Promise((res, rej) => {
      axios
        .post('https://vitalii427-hermes.ambrosus-test.io/asset2/query', params)
        .then(({ data }) => {
          if (data.data) {
            const assetsIds = data.data.map((el) => el.assetId);
            dispatch({
              type: SET_ASSETS_QUERY_DATA,
              payload: data,
            });
            dispatch(fetchAssetsInfo(assetsIds));
            res(data.data);
          }
        })
        .catch((err) => rej(err));
    });
  };

export const fetchAssetsInfo = (assetsIds) => (dispatch) => {
  const params = {
    assets: assetsIds,
    type: 'ambrosus.asset.info',
  };

  axios
    .post(
      'https://vitalii427-hermes.ambrosus-test.io/event2/latest/type',
      params,
    )
    .then(({ data }) => {
      if (data.data) {
        dispatch({
          type: SET_ASSETS_LIST_DATA,
          payload: data.data,
        });
      }
    });
};

export const fetchEventsInfo = () => (dispatch) => {
  const params = {
    next: '',
    query: [
      {
        field: 'organizationId',
        operator: 'equal',
        value: 9,
      },
    ],
  };

  axios
    .post('https://vitalii427-hermes.ambrosus-test.io/event2/query', params)
    .then(({ data }) => {
      if (data.data) {
        dispatch({
          type: SET_EVENTS_DATA,
          payload: data.data,
        });
      }
    });
};
