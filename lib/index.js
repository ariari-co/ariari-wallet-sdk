const merge = require('lodash.merge');
const StellarSdk = require('stellar-sdk');
const { isValidUrl, isValidPublicKey } = require('./utils');

function Wallet(options) {
  this.options = merge({
    token: null,
    authSettings: null,
    networkPassphrase: StellarSdk.Networks.PUBLIC,
  }, options);
  this._validateAuthSettings(this.options.authSettings);
}

Wallet.prototype = {

  setToken(token) {
    this._setOption('token', token);
  },

  getToken() {
    return this._getOption('token');
  },

  setAuthSettings(account, endpoint) {
    this._setOption('authSettings', {
      authAccount: account,
      authEndpoint: endpoint,
    });
    this._validateAuthSettings(this.options.authSettings);
  },

  getAuthSettings() {
    return this._getOption('authSettings');
  },

  setNetworkPassphrase(networkPassphrase) {
    this._setOption('networkPassphrase', networkPassphrase);
  },

  usePublicNet() {
    this.setNetworkPassphrase(StellarSdk.Networks.PUBLIC);
  },

  useTestNet() {
    this.setNetworkPassphrase(StellarSdk.Networks.TESTNET);
  },

  getNetworkPassphrase() {
    return this._getOption('networkPassphrase');
  },

  _setOption(key, value) {
    this.options[key] = value;
  },

  _getOption(key) {
    return this.options[key];
  },

  _validateAuthSettings(settings) {
    if (settings) {
      if (!isValidUrl(settings.authEndpoint)) {
        throw new Error('ariari-wallet.errors.invalid-auth-endpoint')
      }
      if (!isValidPublicKey(settings.authAccount)) {
        throw new Error('ariari-wallet.errors.invalid-auth-account')
      }
    }
  }
};

module.exports = Wallet;
