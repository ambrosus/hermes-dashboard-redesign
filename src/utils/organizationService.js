import axios from 'axios';
import { generateToken } from './generateToken';

export const getOrganizationAccounts = async (organizationId = 9) => {
  const url = `https://vitalii427-hermes.ambrosus-test.io/organization/${organizationId}/accounts`;
  const key = sessionStorage.getItem('user_private_key');
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
  return result.data;
};

export const getOrganizations = async (next = '') => {
  const url = `https://vitalii427-hermes.ambrosus-test.io/organization?next=${next}`;
  const key = sessionStorage.getItem('user_private_key');
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
  return result.data;
};

export default {
  getOrganizationAccounts,
};
