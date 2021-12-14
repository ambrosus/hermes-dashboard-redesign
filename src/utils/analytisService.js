/*eslint-disable*/
import axios from 'axios';
import generateToken from '../utils/generateToken';

export const getTimeRangeCount = async (collection, start, end) => {
  const url = `https://vitalii427-hermes.ambrosus-test.io/analytics/${collection}/count/${start}/${end}/total`;
  const key = sessionStorage.getItem('user_public_key');
  const token = generateToken(key);
  const result = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result.data.data;
};

export const getTimeRangeCountForOrganization = async (
  organizationId,
  collection,
  start,
  end,
) => {
  const url = `https://vitalii427-hermes.ambrosus-test.io/analytics/${organizationId}/${collection}/count/${start}/${end}/total`;
  const key = sessionStorage.getItem('user_public_key');
  const token = generateToken(key);
  const result = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result.data.data;
};

export const getTimeRangeCountAggregate = async (
  collection,
  start,
  end,
  group,
) => {
  const url = `https://vitalii427-hermes.ambrosus-test.io/analytics/9/${collection}/count/${start}/${end}/aggregate/${group}`;
  const key = sessionStorage.getItem('user_public_key');
  const token = generateToken(key);
  const result = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result.data.data;
};

export const getTimeRangeCountAggregateForOrganization = async (
  organizationId = 9,
  collection,
  start,
  end,
  group,
) => {
  const url = `https://vitalii427-hermes.ambrosus-test.io/analytics/${organizationId}/${collection}/count/${start}/${end}/aggregate/${group}`;
  const key = sessionStorage.getItem('user_public_key');
  const token = generateToken(key);
  const result = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result.data.data;
};

export const amb = async () => {
  const url = `https://vitalii427-hermes.ambrosus-test.io/metrics/amb`;
  const key = sessionStorage.getItem('user_public_key');
  const token = generateToken(key);
  const result = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result;
};

export const bundle = async () => {
  const url = `$https://vitalii427-hermes.ambrosus-test.io/metrics/bundle`;
  const key = sessionStorage.getItem('user_public_key');
  const token = generateToken(key);
  const result = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result;
};

export const balance = async () => {
  const url = `https://vitalii427-hermes.ambrosus-test.io/metrics/balance`;
  const key = sessionStorage.getItem('user_public_key');
  const token = generateToken(key);
  const result = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result;
};

export default {
  balance,
  getTimeRangeCount,
  getTimeRangeCountForOrganization,
  getTimeRangeCountAggregate,
  getTimeRangeCountAggregateForOrganization,
  amb,
  bundle,
};
