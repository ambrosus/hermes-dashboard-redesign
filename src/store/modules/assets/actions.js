import axios from 'axios';
import moment from 'moment';
import {
  SET_ASSETS_LIST_DATA,
  SET_ASSETS_QUERY_DATA,
  SET_CREATE_ASSET_RESULT,
  SET_CREATE_EVENT_RESULT,
  SET_EVENTS_DATA,
} from './constants';
import { generateAsset, generateEvent } from '../../../utils/generateToken';
import createAssetNormalizer from '../../../utils/createAssetNormalizer';

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
      const obj = {};

      data.data.forEach((el) => {
        const { assetId } = el.content.idData;

        if (!obj[assetId]) {
          obj[assetId] = [el];
        } else {
          obj[assetId] = [...obj[assetId], el];
        }
      });

      if (data.data) {
        dispatch({
          type: SET_EVENTS_DATA,
          payload: obj,
        });
      }
    });
};

export const createAsset = (formData) => (dispatch) => {
  const privateKey = sessionStorage.getItem('user_private_key');
  const asset = generateAsset(privateKey);

  axios
    .post(
      `https://vitalii427-hermes.ambrosus-test.io/asset2/create/${asset.assetId}`,
      asset,
    )
    .then((response) => {
      const { data } = response;

      if (data.meta && data.meta.code === 200) {
        dispatch(createEvent(asset.assetId, formData));
        dispatch(setCreateAssetResult(data, true));
      }
    })
    .catch((err) => dispatch(setCreateAssetResult(err.response.data, false)));
};

export const createEvent = (assetId, formData) => (dispatch) => {
  const privateKey = sessionStorage.getItem('user_private_key');
  const event = generateEvent(
    assetId,
    createAssetNormalizer(formData),
    privateKey,
  );

  axios
    .post(
      `https://vitalii427-hermes.ambrosus-test.io/event2/create/${event.eventId}`,
      event,
    )
    .then((response) => {
      const { data } = response;

      if (data.meta && data.meta.code === 200) {
        dispatch(setCreateEventResult(data, true));
      }
    })
    .catch((err) => dispatch(setCreateEventResult(err.response.data, false)));
};

const setCreateAssetResult = (data, isSuccess) => ({
  type: SET_CREATE_ASSET_RESULT,
  payload: {
    data,
    isSuccess,
    fetchTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
});

const setCreateEventResult = (data, isSuccess) => ({
  type: SET_CREATE_EVENT_RESULT,
  payload: {
    data,
    isSuccess,
    fetchTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
});
