const jwt = require('jsonwebtoken');
const merge = require('lodash.merge');
const StellarSdk = require('stellar-sdk');
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOjIsImFjY291bnRJZCI6OCwiaWF0IjoxNTc3NzQyMTk3LCJleHAiOjE1Nzc3NDU3OTcsImlzcyI6ImYua3psYWJzLmNvIiwic3ViIjoiR0RPM0xXU0NaTEVMNTNWNlJXSkJMWVRUVDQ0NlBVTzNHSVlOQzJPT0xSWDJLV0kyMjdWUDIyT0giLCJqdGkiOiI4In0.iklqVCn8jRAFpzRmiCn7CXIizH9s8_fe3PEWeQ0ZBQ0';

var utils = module.exports = {
  getJwtToken() {
    return jwtToken;
  },
  getJwtAccountId() {
    const token = jwt.decode(jwtToken);
    return token.sub;
  },

  getWalletInstance(options = {}) {
    const opts = merge({
      networkPassphrase: StellarSdk.Networks.TESTNET,
    }, options);

    return new AriariWallet(opts);
  },
};
