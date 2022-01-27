const decryptPrivateKey = (token, password) => {
  try {
    const { address, privateKey } = window.web3.eth.accounts.decrypt(
      token,
      password,
    );
    return [address, privateKey];
  } catch (e) {
    return [null];
  }
};

export default decryptPrivateKey;
