/**
 * Send a transaction from a multi-sig wallet at BitGo.
 *
 * Copyright 2022, BitGo, Inc.  All Rights Reserved.
 */
const BitGoJS = require('bitgo');
const bitgo = new BitGoJS.BitGo({ env: 'test' });
const Promise = require('bluebird');

const coin = 'tton';
const basecoin = bitgo.coin(coin);
// TODO: set your access token here
const accessToken = 'v2x3335acfd25d88da00f2984eda3881fd4b74e7f2ddedec8afc60269d4d3916a2c';
const walletId = '66bb245592a28b9c889ee65e62ca5d24';
const walletIdReceive = '66fbcc54d08a706890ef50394315b346';
// TODO: set your passphrase here
const walletPassphrase = '#Bondiola1234';

Promise.coroutine(function* () {
  bitgo.authenticateWithAccessToken({ accessToken: accessToken });

  const walletInstance = yield basecoin.wallets().get({ id: walletId });
  const walletInstanceReceive = yield basecoin.wallets().get({ id: walletIdReceive });

  // const newReceiveAddress1 = yield walletInstanceReceive.createAddress();
  const newReceiveAddress1 = 'UQDaHTRgu4TyerZL8pPe9nrkxoAlV-AEVsUsvJ8IN4WqSxbB';
  // const newReceiveAddress2 = yield walletInstance.createAddress();

  const transaction = yield walletInstance.sendMany({
    recipients: [
      {
        amount: '12341234',
        address: newReceiveAddress1,
      },
    ],
    memo: { value : '2' },
    type: 'transfer',
    walletPassphrase: walletPassphrase,
  });
  const explanation = yield basecoin.explainTransaction({ txHex: transaction.tx });

  console.log('Wallet ID:', walletInstance.id());
  console.log('Current Receive Address:', walletInstance.receiveAddress());
  console.log('New Transaction:', JSON.stringify(transaction, null, 4));
  console.log('Transaction Explanation:', JSON.stringify(explanation, null, 4));
})();
