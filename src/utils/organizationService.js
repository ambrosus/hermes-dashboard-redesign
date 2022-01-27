import axios from 'axios';
import moment from 'moment';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { generateToken } from './generateToken';
import { download } from './download';

const apiExtended = 'https://vitalii427-hermes.ambrosus-test.io';

export const getOrganizationAccounts = async (
  organizationId = 45,
  next = '',
) => {
  const url = `${apiExtended}/organization/${organizationId}/accounts?next=${next}`;
  const pendingOrgUrl = `${apiExtended}/organization/invite?next=${next}`;
  const organizations = await axios.get(url);
  const pendingOrganization = await axios.get(pendingOrgUrl);
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
  const organizations = await axios.get(url);
  const pendingOrganization = await axios.get(pendingOrgUrl);
  const declinedOrganisation = await axios.get(declinedOrgUrl);

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
          download.bind(this)(`Backup_${organizationId}.json`, response.data);
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
  const url = `${apiExtended}/organization/invite`;
  const invites = await axios.post(url, email);

  if (invites.error) {
    throw invites.error;
  }
  return invites.data;
};
export const resendInvites = async (email) => {
  const url = `${apiExtended}/organization/invite/resend`;
  const invites = await axios.post(url, email);
  if (invites.error) {
    throw invites.error;
  }
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
  const organization = await axios
    .put(url, body)
    .then(() => {
      NotificationManager.success(`Changes was save successfully`);
    })
    .catch((err) => {
      NotificationManager.error(err.response.data.meta.message);
    });

  if (organization?.error) {
    throw organization.error;
  }
  return organization?.data?.data;
};

export const getOrganization = async (organizationId) => {
  const url = `${apiExtended}/organization/${organizationId}`;
  const organization = await axios.get(url);

  if (organization?.error) {
    throw organization.error;
  }
  return organization?.data?.data;
};

export const modifyAccount = async (address, body) => {
  const url = `${apiExtended}/account2/modify/${address}`;
  const account = await axios
    .post(url, body)
    .then(() => {
      NotificationManager.success(`Changes was save successfully`);
    })
    .catch((err) => {
      NotificationManager.error(err.response.data.meta.message);
    });

  if (account?.error) {
    throw account.error;
  }
  return account?.data;
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
