const StellarSdk = require('stellar-sdk');
const { URL } = require('url');

module.exports = {

  isValidPublicKey(input) {
    if (!input) {
      return false;
    }
    return StellarSdk.StrKey.isValidEd25519PublicKey(input);
  },

  isValidUrl(input) {
    if (!input) {
      return false;
    }
    try {
      new URL(input);
      return true;
    } catch (e) {
      return false;
    }
  },

};
