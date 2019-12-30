'use strict';
const merge = require('lodash.merge');
const StellarSdk = require('stellar-sdk');

var utils = module.exports = {

  getWalletInstance(options = {}) {
    const opts = merge({
      networkPassphrase: StellarSdk.Networks.TESTNET,
    }, options);

    return new AriariWalletSdk(opts);
  },
};
