import axios from 'axios';
import moment from 'moment';
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
import { generateAsset, generateEvent } from '../../../utils/generateToken';
import createAssetNormalizer from '../../../utils/createAssetNormalizer';

export const fetchAssets =
  (next = '') =>
  (dispatch, state) => {
    const searchParams = state().assets.assetsSearchParams;
    const { organization } = state().auth.userInfo;

    const params = {
      limit: 15,
      next,
      query: [
        {
          field: 'organizationId',
          operator: 'equal',
          value: organization,
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

export const fetchAssetsInfo = (assetsIds, isAssetPage) => (dispatch) => {
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
        if (isAssetPage) {
          dispatch(setAssetPageInfo(data.data[0]));
        } else {
          dispatch(
            setAssetsListData(
              data.data.sort(
                (a, b) =>
                  b.content.idData.timestamp - a.content.idData.timestamp,
              ),
            ),
          );
        }
      }
    })
    .finally(() => dispatch(handleAssetsLoading(false)));
};

export const setAssetsListData = (list) => ({
  type: SET_ASSETS_LIST_DATA,
  payload: list,
});

export const fetchEventsInfo = (eventId) => (dispatch) => {
  const params = {
    next: '',
    query: [
      {
        field: 'content.idData.assetId',
        operator: 'equal',
        value: eventId,
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

export const createAsset = (formData, isJSONForm, isEdit) => (dispatch) => {
  const privateKey = sessionStorage.getItem('user_private_key');
  const asset = isJSONForm ? formData : generateAsset(privateKey);

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
            false,
            isEdit,
          ),
        );
        dispatch(
          setCreateResult({
            resultData: { ...data, isSuccess: true },
            percentsComplete: 50,
          }),
        );
      }
    })
    .catch((err) => {
      dispatch(
        setCreateResult({
          resultData: { data: err.response.data, isSuccess: false },
          percentsComplete: 100,
        }),
      );
    });
};

export const createEvent =
  (assetId, formData, isAssetCreating, isBulk) => (dispatch) => {
    const privateKey = sessionStorage.getItem('user_private_key');
    const event = generateEvent(
      assetId,
      createAssetNormalizer(formData, isAssetCreating),
      privateKey,
      formData.accessLevel,
    );
    return new Promise((resolve, reject) => {
      axios
        .post(
          `https://vitalii427-hermes.ambrosus-test.io/event2/create/${event.eventId}`,
          event,
        )
        .then((response) => {
          const { data } = response;

          if (data.meta && data.meta.code === 200 && !isBulk) {
            dispatch(
              setCreateResult({
                resultData: { ...data, isSuccess: true },
                percentsComplete: 100,
              }),
            );
            dispatch({
              type: isAssetCreating
                ? UNSHIFT_ASSETS_LIST_DATA
                : UNSHIFT_EVENTS_LIST_DATA,
              payload: data.data,
            });
          }
          resolve(data);
        })
        .catch((err) => {
          if (!isBulk) {
            dispatch(
              setCreateResult({
                resultData: { data: err.response.data, isSuccess: false },
                percentsComplete: 100,
              }),
            );
          }
          reject(err);
        });
    });
  };

export const bulkEvents = (assetsIds, formData) => (dispatch) => {
  let fetchesComplete = 0;

  assetsIds.forEach((el) =>
    dispatch(createEvent(el, formData, false, true))
      .then((response) => {
        fetchesComplete += 1;
        dispatch(
          setCreateResult({
            resultData: { ...response, isSuccess: true },
            percentsComplete: Math.ceil(
              (100 * fetchesComplete) / assetsIds.length,
            ),
          }),
        );
      })
      .catch((err) => {
        fetchesComplete += 1;
        dispatch(
          setCreateResult({
            resultData: { data: err.response.data, isSuccess: false },
            percentsComplete: Math.ceil(
              (100 * fetchesComplete) / assetsIds.length,
            ),
          }),
        );
      }),
  );
};

const setCreateResult = ({ resultData, percentsComplete }) => ({
  type: SET_CREATE_RESULT,
  payload: {
    resultData: {
      ...resultData,
      fetchTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
    percentsComplete,
  },
});

export const setAssetsSearchParams = (params) => ({
  type: SET_ASSETS_SEARCH_PARAMS,
  payload: params,
});

export const searchAssets = (searchQueries) => (dispatch, getState) => {
  const params = {
    query: [
      {
        field: 'content.idData.createdBy',
        operator: 'equal',
        value: getState().auth.userInfo.publicKey,
      },
      ...searchQueries,
    ],
  };

  return new Promise((resolve, reject) => {
    axios
      .post('https://vitalii427-hermes.ambrosus-test.io/event2/query', params)
      .then(({ data }) => {
        if (data.meta && data.meta.code === 200) {
          const assetsIds = data.data.map((el) => el.content.idData.assetId);
          axios
            .post(
              'https://vitalii427-hermes.ambrosus-test.io/event2/latest/type',
              { assets: assetsIds, type: 'ambrosus.asset.info' },
            )
            .then((res) => {
              if (data.meta && data.meta.code === 200) {
                resolve(res.data.data);
              }
            })
            .catch((err) => reject(err));
        }
      });
  });
};

export const setSearchedAssets = (assets) => ({
  type: SET_SEARCHED_ASSETS_LIST,
  payload: assets,
});

export const setAssetPageInfo = (payload) => ({
  type: SET_ASSET_PAGE_INFO,
  payload,
});
