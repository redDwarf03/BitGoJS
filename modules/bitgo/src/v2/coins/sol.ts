/**
 * @prettier
 */

import BigNumber from 'bignumber.js';
import * as base58 from 'bs58';

import { BaseCoin as StaticsBaseCoin, CoinFamily, coins } from '@bitgo/statics';
import * as accountLib from '@bitgo/account-lib';
import {
  BaseCoin,
  KeyPair,
  ParsedTransaction as BaseParsedTransaction,
  ParseTransactionOptions as BaseParseTransactionOptions,
  SignedTransaction,
  TransactionExplanation,
  TransactionRecipient,
  VerifyAddressOptions,
  VerifyTransactionOptions,
  SignTransactionOptions,
  TransactionPrebuild as BaseTransactionPrebuild,
  PresignTransactionOptions,
} from '../baseCoin';
import { BitGo } from '../../bitgo';
import { Memo } from '../wallet';
import * as _ from 'lodash';
import { MethodNotImplementedError } from '../../errors';
import { AtaInitializationBuilder } from '@bitgo/account-lib/dist/src/coin/sol';
import { BaseTransaction } from '@bitgo/sdk-core';

export interface TransactionFee {
  fee: string;
}
export type SolTransactionExplanation = TransactionExplanation;

export interface ExplainTransactionOptions {
  txBase64: string;
  feeInfo: TransactionFee;
  tokenAccountRentExemptAmount?: string;
}

export interface TxInfo {
  recipients: TransactionRecipient[];
  from: string;
  txid: string;
}

export interface SolSignTransactionOptions extends SignTransactionOptions {
  txPrebuild: TransactionPrebuild;
  prv: string | string[];
  pubKeys?: string[];
}
export interface TransactionPrebuild extends BaseTransactionPrebuild {
  txBase64: string;
  txInfo: TxInfo;
  source: string;
}

export interface SolVerifyTransactionOptions extends VerifyTransactionOptions {
  memo?: Memo;
  feePayer: string;
  blockhash: string;
  durableNonce?: { walletNonceAddress: string; authWalletAddress: number };
}
interface TransactionOutput {
  address: string;
  amount: number | string;
}
type TransactionInput = TransactionOutput;

export interface SolParsedTransaction extends BaseParsedTransaction {
  // total assets being moved, including fees
  inputs: TransactionInput[];

  // where assets are moved to
  outputs: TransactionOutput[];
}

export interface SolParseTransactionOptions extends BaseParseTransactionOptions {
  txBase64: string;
  feeInfo: TransactionFee;
  tokenAccountRentExemptAmount?: string;
}

const HEX_REGEX = /^[0-9a-fA-F]+$/;

export class Sol extends BaseCoin {
  protected readonly _staticsCoin: Readonly<StaticsBaseCoin>;

  constructor(bitgo: BitGo, staticsCoin?: Readonly<StaticsBaseCoin>) {
    super(bitgo);

    if (!staticsCoin) {
      throw new Error('missing required constructor parameter staticsCoin');
    }

    this._staticsCoin = staticsCoin;
  }

  static createInstance(bitgo: BitGo, staticsCoin?: Readonly<StaticsBaseCoin>): BaseCoin {
    return new Sol(bitgo, staticsCoin);
  }

  allowsAccountConsolidations(): boolean {
    return true;
  }

  supportsTss(): boolean {
    return true;
  }

  getChain(): string {
    return this._staticsCoin.name;
  }
  getFamily(): CoinFamily {
    return this._staticsCoin.family;
  }
  getFullName(): string {
    return this._staticsCoin.fullName;
  }
  getBaseFactor(): string | number {
    return Math.pow(10, this._staticsCoin.decimalPlaces);
  }

  async verifyTransaction(params: SolVerifyTransactionOptions): Promise<any> {
    let totalAmount = new BigNumber(0);
    const coinConfig = coins.get(this.getChain());
    const { txParams: txParams, txPrebuild: txPrebuild, memo: memo, durableNonce: durableNonce } = params;
    const transaction = new accountLib.Sol.Transaction(coinConfig);
    const rawTx = txPrebuild.txBase64 || txPrebuild.txHex;
    const consolidateId = txPrebuild.consolidateId;

    const walletRootAddress = params.wallet.coinSpecific()?.rootAddress;

    if (!rawTx) {
      throw new Error('missing required tx prebuild property txBase64 or txHex');
    }

    let rawTxBase64 = rawTx;
    if (HEX_REGEX.test(rawTx)) {
      rawTxBase64 = Buffer.from(rawTx, 'hex').toString('base64');
    }
    transaction.fromRawTransaction(rawTxBase64);
    const explainedTx = transaction.explainTransaction();

    // users do not input recipients for consolidation requests as they are generated by the server
    if (txParams.recipients !== undefined) {
      const filteredRecipients = txParams.recipients?.map((recipient) =>
        _.pick(recipient, ['address', 'amount', 'tokenName'])
      );
      const filteredOutputs = explainedTx.outputs.map((output) => _.pick(output, ['address', 'amount', 'tokenName']));

      if (!_.isEqual(filteredOutputs, filteredRecipients)) {
        throw new Error('Tx outputs does not match with expected txParams recipients');
      }
    }

    const transactionJson = transaction.toJson();
    if (memo && memo.value !== explainedTx.memo) {
      throw new Error('Tx memo does not match with expected txParams recipient memo');
    }
    if (txParams.recipients) {
      for (const recipients of txParams.recipients) {
        totalAmount = totalAmount.plus(recipients.amount);
      }

      if (!totalAmount.isEqualTo(explainedTx.outputAmount)) {
        throw new Error('Tx total amount does not match with expected total amount field');
      }
    }

    // For non-consolidate transactions, feePayer must be the wallet's root address
    if (consolidateId === undefined && transactionJson.feePayer !== walletRootAddress) {
      throw new Error('Tx fee payer is not the wallet root address');
    }

    if (!_.isEqual(explainedTx.durableNonce, durableNonce)) {
      throw new Error('Tx durableNonce does not match with param durableNonce');
    }

    return true;
  }

  isWalletAddress(params: VerifyAddressOptions): boolean {
    throw new MethodNotImplementedError();
  }

  /**
   * Generate Solana key pair
   *
   * @param {Buffer} seed - Seed from which the new keypair should be generated, otherwise a random seed is used
   * @returns {Object} object with generated pub and prv
   */
  generateKeyPair(seed?: Buffer | undefined): KeyPair {
    const result = seed ? new accountLib.Sol.KeyPair({ seed }).getKeys() : new accountLib.Sol.KeyPair().getKeys();
    return result as KeyPair;
  }

  /**
   * Return boolean indicating whether input is valid public key for the coin
   *
   * @param {string} pub the prv to be checked
   * @returns is it valid?
   */
  isValidPub(pub: string): boolean {
    return accountLib.Sol.Utils.isValidPublicKey(pub);
  }

  /**
   * Return boolean indicating whether input is valid private key for the coin
   *
   * @param {string} prv the prv to be checked
   * @returns is it valid?
   */
  isValidPrv(prv: string): boolean {
    return accountLib.Sol.Utils.isValidPrivateKey(prv);
  }

  isValidAddress(address: string): boolean {
    return accountLib.Sol.Utils.isValidAddress(address);
  }

  async signMessage(key: KeyPair, message: string | Buffer): Promise<Buffer> {
    const solKeypair = new accountLib.Sol.KeyPair({ prv: key.prv });
    if (Buffer.isBuffer(message)) {
      message = base58.encode(message);
    }

    return Buffer.from(solKeypair.signMessage(message));
  }

  /**
   * Signs Solana transaction
   * @param params
   * @param callback
   */
  async signTransaction(params: SolSignTransactionOptions): Promise<SignedTransaction> {
    const factory = accountLib.register(this.getChain(), accountLib.Sol.TransactionBuilderFactory);
    const rawTx = params.txPrebuild.txHex || params.txPrebuild.txBase64;
    const txBuilder = factory.from(rawTx);
    txBuilder.sign({ key: params.prv });
    const transaction: BaseTransaction = await txBuilder.build();

    if (!transaction) {
      throw new Error('Invalid transaction');
    }

    const serializedTx = (transaction as BaseTransaction).toBroadcastFormat();

    return {
      txHex: serializedTx,
    } as any;
  }

  async parseTransaction(params: SolParseTransactionOptions): Promise<SolParsedTransaction> {
    const transactionExplanation = await this.explainTransaction({
      txBase64: params.txBase64,
      feeInfo: params.feeInfo,
      tokenAccountRentExemptAmount: params.tokenAccountRentExemptAmount,
    });

    if (!transactionExplanation) {
      throw new Error('Invalid transaction');
    }

    const solTransaction = transactionExplanation as SolTransactionExplanation;
    if (solTransaction.outputs.length <= 0) {
      return {
        inputs: [],
        outputs: [],
      };
    }

    const senderAddress = solTransaction.outputs[0].address;
    const feeAmount = new BigNumber(solTransaction.fee.fee);

    // assume 1 sender, who is also the fee payer
    const inputs = [
      {
        address: senderAddress,
        amount: new BigNumber(solTransaction.outputAmount).plus(feeAmount).toNumber(),
      },
    ];

    const outputs: TransactionOutput[] = solTransaction.outputs.map((output) => {
      return {
        address: output.address,
        amount: output.amount,
      };
    });

    return {
      inputs,
      outputs,
    };
  }

  /**
   * Explain a Solana transaction from txBase64
   * @param params
   */
  async explainTransaction(params: ExplainTransactionOptions): Promise<SolTransactionExplanation> {
    const factory = accountLib.register(this.getChain(), accountLib.Sol.TransactionBuilderFactory);
    let rebuiltTransaction;

    try {
      const transactionBuilder = factory.from(params.txBase64).fee({ amount: params.feeInfo.fee });
      if (transactionBuilder instanceof AtaInitializationBuilder && params.tokenAccountRentExemptAmount) {
        transactionBuilder.rentExemptAmount(params.tokenAccountRentExemptAmount);
      }
      rebuiltTransaction = await transactionBuilder.build();
    } catch {
      throw new Error('Invalid transaction');
    }

    const explainedTransaction = (rebuiltTransaction as BaseTransaction).explainTransaction();

    return explainedTransaction as SolTransactionExplanation;
  }

  /** @inheritDoc */
  async getSignablePayload(serializedTx: string): Promise<Buffer> {
    const factory = accountLib.register(this.getChain(), accountLib.Sol.TransactionBuilderFactory);
    const rebuiltTransaction = await factory.from(serializedTx).build();
    return rebuiltTransaction.signablePayload;
  }

  /** @inheritDoc */
  async presignTransaction(params: PresignTransactionOptions): Promise<PresignTransactionOptions> {
    // Hot wallet txns are only valid for 1-2 minutes.
    // To buy more time, we rebuild the transaction with a new blockhash right before we sign.
    if (params.walletData.type !== 'hot') {
      return Promise.resolve(params);
    }

    const txRequestId = params.txPrebuild?.txRequestId;
    if (txRequestId === undefined) {
      throw new Error('Missing txRequestId');
    }

    const { tssUtils } = params;

    await tssUtils.deleteSignatureShares(txRequestId);
    const recreated = await tssUtils.getTxRequest(txRequestId);

    return Promise.resolve({
      ...params,
      txPrebuild: recreated,
      txHex: recreated.unsignedTxs[0].serializedTxHex,
    });
  }
}
