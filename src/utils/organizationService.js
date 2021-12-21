import axios from 'axios';
import moment from 'moment';
import { generateToken } from './generateToken';
import { download } from './download';

const apiExtended = 'https://vitalii427-hermes.ambrosus-test.io';

export const getOrganizationAccounts = async (
  organizationId = 45,
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
// restoreOrg
export const uploadJSON = async (jsonData) => {
  const url = `${apiExtended}/organization2/restore`;

  await axios.post(url, jsonData).then((response) => {
    if (response.meta.code === 200) document.location.reload();
    else
      console.log(
        `Invalid request! Status code of response: ${response.meta.code}`,
      );
  });
};

export const backupJSON = async (organizationId) => {
  const url = `${apiExtended}/organization2/backup/${+organizationId}`;
  const key = sessionStorage.getItem('user_private_key');
  const token = generateToken(key);
  try {
    await axios
      .get(url, {
        headers: {
          Authorization: `AMB_TOKEN ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const resp = response;
        if (resp.error) {
          console.log('Invalid request:', resp);
          return console.error(
            {},
            `Response status code: ${resp.error.status}`,
          );
        }
        if (response.data.data) {
          download.bind(this)('Backup.json', response.data);
          alert('Organization backuped');
        } else console.log('No data received!');
        return false;
      });
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getFile = (event) => {
  const file = event.target.files[0];
  if (file.type === 'application/json') {
    let jsonData = null;
    const reader = new FileReader();
    const getData = (e) => {
      jsonData = JSON.parse(e.target.result);
      uploadJSON(jsonData);
    };
    reader.addEventListener('load', getData);
    reader.readAsText(file);
    console.log('file', file);
    setTimeout(() => reader.removeEventListener('load', getData), 100);
  } else {
    console.error('File`s type invalid! Please Use [json] type.');
  }
};

// accountsInvites
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
export const resendInvites = async (email) => {
  const url = `${apiExtended}/organization/invite/resend`;

  const invites = await axios.post(url, email);
  if (invites.error) {
    throw invites.error;
  }
  console.log('resendInvites', invites);
  return invites.data;
};

export const deleteInvite = async (inviteId) => {
  const url = `${apiExtended}/organization/invite/${inviteId}`;
  const invite = await axios.delete(url);
  if (invite.error) {
    throw invite.error;
  }
  return invite.data;
};

export const handleOrganizationRequest = async (
  organizationRequestId,
  approved,
) => {
  const pendingOrgUrl = `${apiExtended}/organization/request/${organizationRequestId}/${
    approved ? 'approve' : 'refuse'
  }`;

  const organizationRequest = await axios.get(pendingOrgUrl);
  if (organizationRequest.error) {
    throw organizationRequest.error;
  }

  return organizationRequest.data;
};

// modify

export const modifyOrganization = async (organizationId, body) => {
  const url = `${apiExtended}/organization/${organizationId}`;

  const organization = await axios.put(url, body);
  if (organization.error) {
    throw organization.error;
  }
  alert('modifyOrganization', organization.data);
  return organization.data;
};

export const modifyAccount = async (address, body) => {
  const url = `${apiExtended}/account2/modify/${address}`;

  const account = await axios.post(url, body);
  if (account.error) {
    throw account.error;
  }

  return account.data;
};
export default {
  getFile,
  backupJSON,
  modifyOrganization,
  modifyAccount,
  getOrganizationAccounts,
  getOrganizations,
  deleteInvite,
  resendInvites,
  handleOrganizationRequest,
};
