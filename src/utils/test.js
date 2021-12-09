const base64url = require('base64url');
const axios = require('axios').default;
const Web3 = require('web3');

const LegacyLoadProducer = require('./leagcyloadproducer');

const EXT_URI = process.env.EXT_URI;
const MASTER_PRIVATE_KEY = process.env.MASTER_PRIVATE_KEY;

export default class HermesExtendedApi {
  constructor(extendedApiUrl, builtInPrivateKey) {
    this.web3 = new Web3('');
    this.extendedApiUrl = extendedApiUrl;
    this.builtInPrivateKey = builtInPrivateKey;
  }

  sign(privateKey, data) {
    return this.web3.eth.accounts.sign(this.serializeForHashing(data), privateKey).signature;
  }

  calculateHash(data) {
    return this.web3.eth.accounts.hashMessage(this.serializeForHashing(data));
  }

  privateKeyToAddress(privateKey) {
    return this.web3.eth.accounts.privateKeyToAccount(privateKey).address;
  }

  unixTime() {
    return Math.floor(Date.now() / 1000);
  }

  serializeForHashing(object) {
    const isDict = (subject) => typeof subject === 'object' && !Array.isArray(subject);
    const isString = (subject) => typeof subject === 'string';
    const isArray = (subject) => Array.isArray(subject);

    if (isDict(object)) {
      const content = Object.keys(object).sort()
        .map((key) => `"${key}":${this.serializeForHashing(object[key])}`)
        .join(',');
      return `{${content}}`;
    } else if (isArray(object)) {
      const content = object.map((item) => this.serializeForHashing(item)).join(',');
      return `[${content}]`;
    } else if (isString(object)) {
      return `"${object}"`;
    }
    return object.toString();
  };

  generateToken(privateKey, seconds = 86400 * 10000) {
    const idData = {
      createdBy: this.privateKeyToAddress(privateKey),
      validUntil: this.unixTime() + seconds,
    };

    const token = base64url(this.serializeForHashing({
      idData,
      signature: this.sign(privateKey, idData)
    }));

    return token;
  }

  generateAsset(secret) {
    const address = this.privateKeyToAddress(secret);
    const idData = {
      createdBy: address,
      sequenceNumber: 0,
      timestamp: this.unixTime()
    };

    const content = {
      idData,
      signature: this.sign(secret, idData)
    };

    const asset = {
      assetId: this.calculateHash(content),
      content
    };

    return asset;
  }

  generateEvent(assetId, dataArray, secret) {
    const address = this.privateKeyToAddress(secret);
    const idData = {
      assetId: assetId,
      timestamp: this.unixTime(),
      accessLevel: 0,
      createdBy: address,
      dataHash: this.calculateHash(dataArray)
    };

    const content = {
      idData,
      signature: this.sign(secret, idData),
      data: dataArray
    };

    const event = {
      eventId: this.calculateHash(content),
      content
    };

    return event;
  }

  getHeaders(privateKey) {
    return {
      'Authorization': `AMB_TOKEN ${this.generateToken(privateKey)}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async getKeyPair() {
    try {
      const result = await axios.get(`${this.extendedApiUrl}/account/keypair`);
      if (result.status !== 200) {
        throw new Error(`${result.status} ${result.statusText}`);
      }
      return result.data.data;
    } catch (err) {
      console.error('getKeyPair', err);
      return null;
    }
  }

  async createAsset(secret) {
    try {
      const address = this.privateKeyToAddress(secret);
      const asset = this.generateAsset(secret);
      const result = await axios.post(`${this.extendedApiUrl}/asset2/create/${asset.assetId}`,
        asset, {headers: this.getHeaders(secret)});
      if (result.status !== 200) {
        throw new Error(`${result.status} ${result.statusText}`);
      }
      return result.data.data;
    } catch (err) {
      console.error('createAsset', err);
      return null;
    }
  }

  async createEvent(assetId, data, secret) {
    try {
      const address = this.privateKeyToAddress(secret);
      const event = this.generateEvent(assetId, data, secret);
      const result = await axios.post(`${this.extendedApiUrl}/event2/create/${event.eventId}`,
        event, {headers: this.getHeaders(secret)});
      if (result.status !== 200) {
        throw new Error(`${result.status} ${result.statusText}`);
      }
      return result.data.data;
    } catch (err) {
      console.error('createEvent', err);
      return null;
    }
  }

  async createAccount() {
    const account = await this.getKeyPair();
    if (!account) {
      return null;
    }

    try {
      const payload = {
        email: `${account.address}@no.com`,
        fullName: account.address,
        accessLevel: 100,
        permissions: ['create_asset', 'create_event']
      }

      const result = await axios.post(`${this.extendedApiUrl}/account2/create/${account.address}`,
        payload, {headers: this.getHeaders(this.builtInPrivateKey)});
      if (result.status !== 200) {
        throw new Error(`${result.status} ${result.statusText}`);
      }
      return account;
    } catch (err) {
      console.error('createAccount', err);
      return null;
    }
  }
}

function start() {
  try {
    if (!EXT_URI || !MASTER_PRIVATE_KEY) {
      console.error("Required env: EXT_URI, MASTER_PRIVATE_KEY");
      return;
    }
    console.log('START');
    const extendedApi = new HermesExtendedApi(EXT_URI, MASTER_PRIVATE_KEY);

    const producer = new LegacyLoadProducer(extendedApi);
    producer.start();
  } catch (err) {
    console.error('UNHANDLED', err);
  }
}

start();
