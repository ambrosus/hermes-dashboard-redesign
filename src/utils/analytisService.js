import axios from 'axios';
import { environment } from './environment';
export const getTimeRangeCount = async (collection, start, end) => {
  const url = `${environment.api.extended}/analytics/${collection}/count/${start}/${end}/total`;
  const result = await axios.get(url);
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
  const url = `${environment.api.extended}/analytics/${organizationId}/${collection}/count/${start}/${end}/total`;
  const result = await axios.get(url);
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
  const url = `${environment.api.extended}/analytics/${collection}/count/${start}/${end}/aggregate/${group}`;
  const result = await axios.get(url);
  return result.data.data;
};

export const getTimeRangeCountAggregateForOrganization = async (
  organizationId = 9,
  collection,
  start,
  end,
  group,
) => {
  const url = `${environment.api.extended}/analytics/${organizationId}/${collection}/count/${start}/${end}/aggregate/${group}`;
  const result = await axios.get(url);
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result.data.data;
};

export const amb = async () => {
  const url = `${environment.api.extended}/metrics/amb`;
  const result = await axios.get(url);
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result;
};

export const bundle = async () => {
  const url = `${environment.api.extended}/metrics/bundle`;
  const result = await axios.get(url);
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result;
};

export const balance = async () => {
  const url = `${environment.api.extended}/metrics/balance`;
  const result = await axios.get(url);
  if (result.status !== 200) {
    throw new Error(`${result.status} ${result.statusText}`);
  }
  return result;
};

export const pushBundle = async () => {
  const url = `${environment.api.extended}/bundle2/push`;
  try {
    await axios.post(url);
  } catch (e) {
    if (e) {
      alert(e);
    }
  }
};

export default {
  balance,
  pushBundle,
  getTimeRangeCount,
  getTimeRangeCountForOrganization,
  getTimeRangeCountAggregate,
  getTimeRangeCountAggregateForOrganization,
  amb,
  bundle,
};
