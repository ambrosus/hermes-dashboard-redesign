import axios from 'axios';
import moment from 'moment';
import { generateToken } from './generateToken';
const apiExtended = 'https://vitalii427-hermes.ambrosus-test.io';

export const getOrganizationAccounts = async (
  organizationId = 9,
  next = '',
) => {
  const url = `${apiExtended}/organization/${organizationId}/accounts?next=${next}`;
  const pendingOrgUrl = `${apiExtended}/organization/invite?next=${next}`;
  const key = sessionStorage.getItem('user_private_key');
  const token = generateToken(key);
  const organizations = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const pendingOrganization = await axios.get(pendingOrgUrl, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  console.log('pendingOrganization', pendingOrganization);
  const activeOrg = organizations.data.data.filter((organization) => {
    // todo this.account.timeZone ||
    const reassignOrganisation = organization;
    reassignOrganisation.createdOn = moment
      .tz(organization.createdOn * 1000, 'UTC')
      .fromNow();
    return organization.active;
  });
  const organizationsDisabled = organizations.data.data.filter(
    (organization) => !organization.active,
  );
  return {
    all: [
      ...activeOrg,
      ...pendingOrganization.data.data,
      ...organizationsDisabled,
    ],
    active: activeOrg,
    pending: pendingOrganization.data.data,
    disabled: organizationsDisabled,
  };
};
export const getOrganizations = async (next = '') => {
  const url = `${apiExtended}/organization?next=${next}`;
  const pendingOrgUrl = `${apiExtended}/organization/request?next=${next}`;
  const declinedOrgUrl = `${apiExtended}/organization/request/refused?next=${next}`;

  const key = sessionStorage.getItem('user_private_key');
  const token = generateToken(key);
  const organizations = await axios.get(url, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const pendingOrganization = await axios.get(pendingOrgUrl, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const declinedOrganisation = await axios.get(declinedOrgUrl, {
    headers: {
      Authorization: `AMB_TOKEN ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const activeOrg = organizations.data.data.filter((organization) => {
    // todo this.account.timeZone ||
    const reassignOrganisation = organization;
    reassignOrganisation.createdOn = moment
      .tz(organization.createdOn * 1000, 'UTC')
      .fromNow();
    return organization.active;
  });
  const organizationsDisabled = organizations.data.data.filter(
    (organization) => !organization.active,
  );
  return {
    all: [
      ...activeOrg,
      ...pendingOrganization.data.data,
      ...declinedOrganisation.data.data,
      ...organizationsDisabled,
    ],
    active: activeOrg,
    pending: pendingOrganization.data.data,
    disabled: organizationsDisabled,
    declined: declinedOrganisation.data.data,
  };
};

export const createInvites = async (email) => {
  console.log('createInvites email', email);
  const url = `${apiExtended}/organization/invite`;

  const invites = await axios.post(url, email);
  if (invites.error) {
    throw invites.error;
  }

  console.log('createInvites', invites);

  return invites.data;
};

export default {
  getOrganizationAccounts,
  getOrganizations,
};
