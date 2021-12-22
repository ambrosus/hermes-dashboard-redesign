import axios from 'axios';

const apiExtended = 'https://vitalii427-hermes.ambrosus-test.io';

const getAccounts = async (next = '') => {
  const url = `${apiExtended}/account&next=${next}`;
  const accounts = await axios.get(url);
  if (accounts.error) {
    throw accounts.error;
  }

  return accounts.data;
};

const getAccount = async (address) => {
  const url = `${apiExtended}/account/${address}`;

  const account = await axios.get(url);

  if (account.error) {
    console.log(account.error);
    throw account.error;
  }

  return account.data;
};

export { getAccounts, getAccount };
