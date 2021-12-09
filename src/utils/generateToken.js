import base64url from 'base64url';

const generateToken = (privateKey, seconds = 86400 * 10000) => {
  const idData = {
    createdBy: privateKeyToAddress(privateKey),
    validUntil: Math.floor(Date.now() / 1000) + seconds,
  };

  return base64url(
    serializeForHashing({
      idData,
      signature: sign(privateKey, idData),
    }),
  );
};

const privateKeyToAddress = (privateKey) =>
  window.web3.eth.accounts.privateKeyToAccount(privateKey).address;

const serializeForHashing = (object) => {
  const isDict = (subject) =>
    typeof subject === 'object' && !Array.isArray(subject);
  const isString = (subject) => typeof subject === 'string';
  const isArray = (subject) => Array.isArray(subject);

  if (isDict(object)) {
    const content = Object.keys(object)
      .sort()
      .map((key) => `"${key}":${serializeForHashing(object[key])}`)
      .join(',');
    return `{${content}}`;
  }
  if (isArray(object)) {
    const content = object.map((item) => serializeForHashing(item)).join(',');
    return `[${content}]`;
  }
  if (isString(object)) {
    return `"${object}"`;
  }
  return object.toString();
};

const sign = (privateKey, data) =>
  window.web3.eth.accounts.sign(serializeForHashing(data), privateKey)
    .signature;

export default generateToken;
