export const parseJsonString = (str) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return str;
  }
};

export const blockExplorerUrl = (url, hash) => {
  return url + 'tx/' + hash;
};

export const walletAddressModifier = (address) => {
  return address ? address.substring(0, 15) + '...' : '';
};
