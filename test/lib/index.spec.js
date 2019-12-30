const MockAdapter = require('axios-mock-adapter');

describe('StellarAuth', () => {

  it('Should have valid default values', () => {
    const opts = (new AriariWallet()).options;
    expect(opts.token).to.equal(null);
    expect(opts.authSettings).to.equal(null);
    expect(opts.networkPassphrase).to.equal(StellarSdk.Networks.PUBLIC);
  });

  it('Should allow set token', () => {
    let wallet = testUtils.getWalletInstance({ token: testUtils.getJwtToken() });
    expect(wallet.options.token).to.equal(testUtils.getJwtToken());
    expect(wallet.options.accountId).to.equal(testUtils.getJwtAccountId());

    wallet.setToken(null);
    expect(wallet.getToken()).to.equal(null);
    expect(wallet.getAccountId()).to.equal(null);

    wallet.setToken(testUtils.getJwtToken());
    expect(wallet.getToken()).to.equal(testUtils.getJwtToken());
    expect(wallet.getAccountId()).to.equal(testUtils.getJwtAccountId());
  });

  it('Should throw error for invalid token', () => {
    const badToken = 'myToken';

    expect(() => testUtils.getWalletInstance({ token: badToken }))
    .to.throw('ariari-wallet.errors.invalid-token');

    let wallet = testUtils.getWalletInstance();
    expect(() => wallet.setToken(badToken))
    .to.throw('ariari-wallet.errors.invalid-token');
  });

  it('Should allow set authSettings', () => {
    const authAccount = StellarSdk.Keypair.random().publicKey();
    const authEndpoint = 'https://myanchor.co/auth';

    const authAccount1 = StellarSdk.Keypair.random().publicKey();
    const authEndpoint1 = 'https://secondanchor.co/auth';

    let wallet = testUtils.getWalletInstance({
      authSettings: { authAccount, authEndpoint },
    });
    expect(wallet.options.authSettings.authAccount).to.equal(authAccount);
    expect(wallet.getAuthSettings().authAccount).to.equal(authAccount);
    expect(wallet.options.authSettings.authEndpoint).to.equal(authEndpoint);
    expect(wallet.getAuthSettings().authEndpoint).to.equal(authEndpoint);

    wallet.setAuthSettings(authAccount1, authEndpoint1);
    expect(wallet.options.authSettings.authAccount).to.equal(authAccount1);
    expect(wallet.getAuthSettings().authAccount).to.equal(authAccount1);
    expect(wallet.options.authSettings.authEndpoint).to.equal(authEndpoint1);
    expect(wallet.getAuthSettings().authEndpoint).to.equal(authEndpoint1);
  });

  it('Should throw error for invalid authSettings.authEndpoint', () => {
    const authAccount = StellarSdk.Keypair.random().publicKey();
    const badAuthEndpoint = 'myanchor';

    expect(() => testUtils.getWalletInstance({
      authSettings: { authAccount, authEndpoint: badAuthEndpoint },
    }))
    .to.throw('ariari-wallet.errors.invalid-auth-endpoint');

    let wallet = testUtils.getWalletInstance();
    expect(() => wallet.setAuthSettings(authAccount, ''))
    .to.throw('ariari-wallet.errors.invalid-auth-endpoint');
  });

  it('Should throw error for invalid authSettings.authAccount', () => {
    const badAuthAccount = 'GPDUSO';
    const authEndpoint = 'https://myanchor.co/auth';

    expect(() => testUtils.getWalletInstance({
      authSettings: { authAccount: badAuthAccount, authEndpoint },
    }))
    .to.throw('ariari-wallet.errors.invalid-auth-account');

    wallet = testUtils.getWalletInstance();
    expect(() => wallet.setAuthSettings('', authEndpoint))
    .to.throw('ariari-wallet.errors.invalid-auth-account');
  });

  it('Should allow set networkPassphrase', () => {
    const networkPassphrase = 'My network passphrase';
    const wallet = testUtils.getWalletInstance({ networkPassphrase });
    expect(wallet.options.networkPassphrase).to.equal(networkPassphrase);

    wallet.setNetworkPassphrase(StellarSdk.Networks.TESTNET);
    expect(wallet.getNetworkPassphrase()).to.equal(StellarSdk.Networks.TESTNET);

    wallet.usePublicNet();
    expect(wallet.getNetworkPassphrase()).to.equal(StellarSdk.Networks.PUBLIC);

    wallet.useTestNet();
    expect(wallet.getNetworkPassphrase()).to.equal(StellarSdk.Networks.TESTNET);
  });
});
