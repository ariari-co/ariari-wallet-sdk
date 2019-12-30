const jwt = require('jsonwebtoken');
const merge = require('lodash.merge');
const StellarSdk = require('stellar-sdk');
const { isValidUrl, isValidPublicKey } = require('./utils');

function Wallet(options) {
  this.options = merge({
    token: null,
    accountId: null,
    authSettings: null,
    networkPassphrase: StellarSdk.Networks.PUBLIC,
  }, options);
  this._validateAuthSettings(this.options.authSettings);
  if (this.options.token) {
    this.setToken(this.options.token);
  }
}

Wallet.prototype = {

  setToken(token) {
    let accountId = null;
    if (token) {
      const jwtToken = this._validateToken(token);
      accountId = jwtToken.sub;
    }
    this._setOption('accountId', accountId);
    this._setOption('token', token);
  },

  getToken() {
    return this._getOption('token');
  },

  getAccountId() {
    return this._getOption('accountId');
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
  },

  _validateToken(token) {
    const jwtToken = jwt.decode(token);
    if (!jwtToken || !jwtToken.sub) {
      throw new Error('ariari-wallet.errors.invalid-token')
    }
    return jwtToken;
  },
};

module.exports = Wallet;
