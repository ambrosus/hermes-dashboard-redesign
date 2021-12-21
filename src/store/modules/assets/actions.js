import axios from 'axios';
import moment from 'moment';
import {
  SET_ASSETS_LIST_DATA,
  SET_ASSETS_LOADING,
  SET_ASSETS_QUERY_DATA,
  SET_ASSETS_SEARCH_PARAMS,
  SET_CREATE_ASSET_RESULT,
  SET_CREATE_EVENT_RESULT,
  SET_EVENTS_DATA,
} from './constants';
import { generateAsset, generateEvent } from '../../../utils/generateToken';
import createAssetNormalizer from '../../../utils/createAssetNormalizer';

export const fetchAssets =
  (next = '') =>
  (dispatch, state) => {
    const searchParams = state().assets.assetsSearchParams;

    const params = {
      limit: 15,
      next,
      query: [
        {
          field: 'organizationId',
          operator: 'equal',
          value: 54,
        },
        ...(searchParams && searchParams),
      ],
    };
    dispatch(handleAssetsLoading(true));
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
        .catch((err) => {
          rej(err);
          dispatch(handleAssetsLoading(false));
        });
    });
  };

export const handleAssetsListSearch = (searchData) => (dispatch) => {
  dispatch(setAssetsListData([]));
  dispatch(setAssetsSearchParams(searchData));
  dispatch(fetchAssets());
};

const handleAssetsLoading = (isLoading) => ({
  type: SET_ASSETS_LOADING,
  payload: isLoading,
});

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
        dispatch(
          setAssetsListData(
            data.data.sort(
              (a, b) => b.content.idData.timestamp - a.content.idData.timestamp,
            ),
          ),
        );
      }
    })
    .finally(() => dispatch(handleAssetsLoading(false)));
};

export const setAssetsListData = (list) => ({
  type: SET_ASSETS_LIST_DATA,
  payload: list,
});

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
        dispatch(
          createEvent(
            asset.assetId,
            {
              ...formData,
              type: 'ambrosus.asset.info',
            },
            true,
          ),
        );
        dispatch(setCreateAssetResult(data, true));
      }
    })
    .catch((err) => dispatch(setCreateAssetResult(err.response.data, false)));
};

export const createEvent =
  (assetId, formData, isAssetCreating) => (dispatch) => {
    const privateKey = sessionStorage.getItem('user_private_key');
    const event = generateEvent(
      assetId,
      createAssetNormalizer(formData, isAssetCreating),
      privateKey,
    );

    return new Promise((resolve, reject) => {
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
          resolve(data);
        })
        .catch((err) => {
          dispatch(setCreateEventResult(err.response.data, false));
          reject(err);
        });
    });
  };

export const bulkEvents = (assetsIds, formData) => (dispatch) => {
  Promise.allSettled(
    assetsIds.map((el) => dispatch(createEvent(el, formData))),
  ).then((response) => {
    console.log(response);
  });
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

export const setAssetsSearchParams = (params) => ({
  type: SET_ASSETS_SEARCH_PARAMS,
  payload: params,
});
