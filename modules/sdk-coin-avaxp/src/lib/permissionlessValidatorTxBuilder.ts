import {
  Address,
  avaxSerial,
  utils as AvaxUtils,
  BigIntPr,
  Credential,
  Id,
  Input,
  Int,
  networkIDs,
  OutputOwners,
  pvmSerial,
  TransferInput,
  TransferOutput,
  TypeSymbols,
  UnsignedTx,
  Utxo,
} from '@bitgo/avalanchejs';
import {
  BaseAddress,
  BaseKey,
  BuildTransactionError,
  isValidBLSPublicKey,
  isValidBLSSignature,
  NotSupported,
  TransactionType,
} from '@bitgo/sdk-core';

import { AvalancheNetwork, BaseCoin as CoinConfig } from '@bitgo/statics';
import { Buffer as BufferAvax } from 'avalanche';
import BigNumber from 'bignumber.js';
import { DecodedUtxoObj, SECP256K1_Transfer_Output, Tx } from './iface';
import { KeyPair } from './keyPair';
import { Transaction } from './transaction';
import { TransactionBuilder } from './transactionBuilder';
import utils from './utils';
import { recoverUtxos } from './utxoEngine';

export class PermissionlessValidatorTxBuilder extends TransactionBuilder {
  public _signer: KeyPair[] = [];
  protected _nodeID: string;
  protected _blsPublicKey: string;
  protected _blsSignature: string;
  protected _startTime: bigint;
  protected _endTime: bigint;
  protected _stakeAmount: bigint;
  protected recoverSigner = false;
  protected _delegationFeeRate: number;

  /**
   *
   * @param coinConfig
   */
  constructor(coinConfig: Readonly<CoinConfig>) {
    super(coinConfig);
    const network = coinConfig.network as AvalancheNetwork;
    this._stakeAmount = BigInt(network.minStake);
  }

  /**
   * get transaction type
   * @protected
   */
  protected get transactionType(): TransactionType {
    return TransactionType.AddPermissionlessValidator;
  }

  // region Validators
  /**
   * Validates locktime
   * @param locktime
   */
  validateLocktime(locktime: bigint): void {
    if (locktime < BigInt(0)) {
      throw new BuildTransactionError('Invalid transaction: locktime must be 0 or higher');
    }
  }

  /**
   * Validate that the delegation fee is at least the minDelegationFee
   * @param delegationFeeRate number
   */
  validateDelegationFeeRate(delegationFeeRate: number): void {
    if (delegationFeeRate < Number(this.transaction._network.minDelegationFee)) {
      throw new BuildTransactionError(
        `Delegation fee cannot be less than ${this.transaction._network.minDelegationFee}`
      );
    }
  }

  /**
   * Check the UTXO has expected fields.
   * @param UTXO
   */
  validateUtxo(value: DecodedUtxoObj): void {
    ['outputID', 'amount', 'txid', 'outputidx'].forEach((field) => {
      if (!value.hasOwnProperty(field)) throw new BuildTransactionError(`Utxos required ${field}`);
    });
  }
  // endregion

  /**
   * Addresses where reward should be deposit
   * @param {string | string[]} address - single address or array of addresses to receive rewards
   */
  rewardAddresses(address: string | string[]): this {
    const rewardAddresses = address instanceof Array ? address : [address];
    this.transaction._rewardAddresses = rewardAddresses.map(utils.parseAddress);
    return this;
  }

  /** @inheritdoc */
  protected fromImplementation(rawTransaction: string): Transaction {
    // TODO(CR-1073): remove clog
    console.log('Building from hex!!!');
    const manager = AvaxUtils.getManagerForVM('PVM');
    const [codec, rest] = manager.getCodecFromBuffer(AvaxUtils.hexToBuffer(rawTransaction));
    const tx = codec.UnpackPrefix<pvmSerial.AddPermissionlessValidatorTx>(rest)[0];
    this.initBuilder(tx);
    return this.transaction;
  }

  /** @inheritdoc */
  protected async buildImplementation(): Promise<Transaction> {
    this.buildAvaxTransaction();
    this.transaction.setTransactionType(this.transactionType);
    if (this.hasSigner()) {
      for (const keyPair of this._signer) {
        // TODO(CR-1073): remove clog
        // console.log('Signing with key', JSON.stringify(keyPair.getKeys()));
        await this.transaction.sign(keyPair);
      }
    }
    return this.transaction;
  }

  /**
   *
   * @param nodeID
   */
  nodeID(nodeID: string): this {
    this.validateNodeID(nodeID);
    this._nodeID = nodeID;
    return this;
  }

  /**
   *
   * @param blsPublicKey
   */
  blsPublicKey(blsPublicKey: string): this {
    isValidBLSPublicKey(blsPublicKey);
    this._blsPublicKey = blsPublicKey;
    return this;
  }

  /**
   *
   * @param blsSignature
   */
  blsSignature(blsSignature: string): this {
    isValidBLSSignature(blsSignature);
    this._blsSignature = blsSignature;
    return this;
  }

  /**
   * Locktime is a long that contains the unix timestamp that this output can be spent after.
   * The unix timestamp is specific to the second.
   * @param value
   */
  locktime(value: string | number): this {
    this.validateLocktime(BigInt(value));
    this._transaction._locktime = BigInt(value);
    return this;
  }

  /**
   * set the delegationFeeRate
   * @param value number
   */
  delegationFeeRate(value: number): this {
    this.validateDelegationFeeRate(value);
    this._delegationFeeRate = value;
    return this;
  }

  /**
   * start time of staking period
   * @param value
   */
  startTime(value: string | number): this {
    this._startTime = BigInt(value);
    return this;
  }

  /**
   * end time of staking period
   * @param value
   */
  endTime(value: string | number): this {
    this._endTime = BigInt(value);
    return this;
  }

  /**
   *
   * @param value
   */
  stakeAmount(value: bigint | string): this {
    const valueBigInt = typeof value === 'bigint' ? value : BigInt(value);
    this.validateStakeAmount(valueBigInt);
    this._stakeAmount = valueBigInt;
    return this;
  }

  // region Validators
  /**
   * validates a correct NodeID is used
   * @param nodeID
   */
  validateNodeID(nodeID: string): void {
    if (!nodeID) {
      throw new BuildTransactionError('Invalid transaction: missing nodeID');
    }
    if (nodeID.slice(0, 6) !== 'NodeID') {
      throw new BuildTransactionError('Invalid transaction: invalid NodeID tag');
    }
    if (!(AvaxUtils.base58.decode(nodeID.slice(7)).length === 24)) {
      throw new BuildTransactionError('Invalid transaction: NodeID is not in cb58 format');
    }
  }

  /**
   * Validate stake duration
   * @param startTime
   * @param endTime
   */
  validateStakeDuration(startTime: bigint, endTime: bigint): void {
    if (endTime < startTime) {
      throw new BuildTransactionError('End date cannot be less than start date');
    }
  }

  /**
   * Validate stake amount
   * @param amount
   */
  validateStakeAmount(amount: bigint): void {
    const minStake = BigInt(this.transaction._network.minStake);
    if (amount < minStake) {
      throw new BuildTransactionError('Minimum staking amount is ' + Number(minStake) / 1000000000 + ' AVAX.');
    }
    return;
  }

  // endregion

  /** @inheritdoc */
  initBuilder(tx: Tx): this {
    super.initBuilder(tx);
    const permissionlessValidatorTx = (tx as UnsignedTx).tx as pvmSerial.AddPermissionlessValidatorTx;
    if (!this.verifyTxType(permissionlessValidatorTx)) {
      throw new NotSupported('Transaction cannot be parsed or has an unsupported transaction type');
    }

    const outputs = permissionlessValidatorTx.baseTx.outputs;
    if (outputs.length !== 1) {
      throw new BuildTransactionError('Transaction can have one external output');
    }

    const output = outputs[0].output as TransferOutput;
    if (outputs[0].getAssetId() !== this.transaction._assetId) {
      throw new Error('The Asset ID of the output does not match the transaction');
    }

    this.transaction._blsPublicKey = AvaxUtils.bufferToHex(
      (permissionlessValidatorTx.signer as pvmSerial.Signer).proof.publicKey
    );
    this._blsPublicKey = this.transaction._blsPublicKey;
    this.transaction._blsSignature = AvaxUtils.bufferToHex(
      (permissionlessValidatorTx.signer as pvmSerial.Signer).proof.signature
    );
    this._blsSignature = this.transaction._blsSignature;

    this.transaction._locktime = output.outputOwners.locktime.value();
    this.transaction._threshold = output.outputOwners.threshold.value();
    this.transaction._nodeID = permissionlessValidatorTx.subnetValidator.validator.nodeId.toString();
    this._nodeID = this.transaction._nodeID;
    this.transaction._startTime = permissionlessValidatorTx.subnetValidator.validator.startTime.value();
    this._startTime = this.transaction._startTime;
    this.transaction._endTime = permissionlessValidatorTx.subnetValidator.validator.endTime.value();
    this._endTime = this.transaction._endTime;
    this.transaction._fromAddresses = output.outputOwners.addrs.sort().map((a) => AvaxUtils.hexToBuffer(a.toHex()));
    // this.transaction._fromAddresses = [
    //   AvaxUtils.hexToBuffer(output.outputOwners.addrs[2].toHex()),
    //   AvaxUtils.hexToBuffer(output.outputOwners.addrs[0].toHex()),
    //   AvaxUtils.hexToBuffer(output.outputOwners.addrs[1].toHex()),
    // ];
    this.transaction._stakeAmount = permissionlessValidatorTx.stake[0].output.amount();
    this.transaction._utxos = recoverUtxos(permissionlessValidatorTx.getInputs());
    return this;
  }

  static verifyTxType(type: TypeSymbols): boolean {
    return type === TypeSymbols.AddPermissionlessValidatorTx;
  }

  verifyTxType(tx: Tx): tx is pvmSerial.AddPermissionlessValidatorTx {
    return PermissionlessValidatorTxBuilder.verifyTxType((tx as pvmSerial.AddPermissionlessValidatorTx)._type);
  }

  // @TODO(CR-1073): Remove this method when calculateUtxos() is ready
  // protected createInputOutput(): {
  //   inputs: avaxSerial.TransferableInput[];
  //   outputs: avaxSerial.TransferableOutput[];
  //   credentials: Credential[];
  // } {
  //   const inputs: avaxSerial.TransferableInput[] = [];
  //   const outputs: avaxSerial.TransferableOutput[] = [];
  //
  //   // amount spent so far
  //   let currentTotal = BigInt(0);
  //
  //   // delegating and validating have no fees
  //   const totalTarget = this._stakeAmount.valueOf();
  //
  //   const credentials: Credential[] = [];
  //
  //   // convert fromAddresses to string
  //   // fromAddresses = bitgo order if we are in WP
  //   // fromAddresses = onchain order if we are in from
  //   const bitgoAddresses = this.transaction._fromAddresses.map((b) =>
  //     utils.addressToString(this.transaction._network.hrp, this.transaction._network.alias, BufferAvax.from(b))
  //   );
  //
  //   /*
  //   A = user key
  //   B = hsm key
  //   C = backup key
  //   bitgoAddresses = bitgo addresses [ A, B, C ]
  //   utxo.addresses = IMS addresses [ B, C, A ]
  //   utxo.addressesIndex = [ 2, 0, 1 ]
  //   we pick 0, 1 for non-recovery
  //   we pick 1, 2 for recovery
  //   */
  //   this.transaction._utxos.forEach((utxo) => {
  //     // in WP, output.addressesIndex is empty, so fill it
  //     if (!utxo.addressesIndex || utxo.addressesIndex.length === 0) {
  //       utxo.addressesIndex = bitgoAddresses.map((a) => utxo.addresses.indexOf(a));
  //     }
  //     // in OVC, output.addressesIndex is defined correctly from the previous iteration
  //   });
  //
  //   // validate the utxos
  //   this.transaction._utxos.forEach((utxo) => {
  //     if (!utxo) {
  //       throw new BuildTransactionError('Utxo is undefined');
  //     }
  //     // addressesIndex should never mismatch
  //     if (utxo.addressesIndex?.includes(-1)) {
  //       throw new BuildTransactionError('Addresses are inconsistent');
  //     }
  //     if (utxo.threshold !== this.transaction._threshold) {
  //       throw new BuildTransactionError('Threshold is inconsistent');
  //     }
  //   });
  //
  //   // if we are in OVC, none of the utxos will have addresses since they come from
  //   // deserialized inputs (which don't have addresses), not the IMS
  //   const buildOutputs = this.transaction._utxos[0].addresses.length !== 0;
  //
  //   this.transaction._utxos.forEach((utxo, i) => {
  //     // TODO(CR - 1073): Check the below implementation
  //     if (utxo.outputID === SECP256K1_Transfer_Output) {
  //       // const txidBuf = utils.cb58Decode(utxo.txid);
  //       const amt = BigInt(utxo.amount);
  //       // const outputidx = utils.outputidxNumberToBuffer(utxo.outputidx);
  //       const addressesIndex = utxo.addressesIndex ?? [];
  //
  //       // either user (0) or recovery (2)
  //       const firstIndex = this.recoverSigner ? 2 : 0;
  //       const bitgoIndex = 1;
  //       currentTotal = currentTotal + amt;
  //
  //       // TODO(CR-1073): How do we find sigIndices here ?
  //       // const secpTransferInput = TransferInput.fromNative(amt, []);
  //
  //       // TODO(CR-1073): Need to identify what is the replacement for addSignatureIdx in the new library
  //       if (!buildOutputs) {
  //         // addressesIndex.forEach((i) => secpTransferInput.addSignatureIdx(i, this.transaction._fromAddresses[i]));
  //       } else {
  //         // if user/backup > bitgo
  //         if (addressesIndex[bitgoIndex] < addressesIndex[firstIndex]) {
  //           // secpTransferInput.addSignatureIdx(addressesIndex[bitgoIndex], this.transaction._fromAddresses[bitgoIndex]);
  //           // secpTransferInput.addSignatureIdx(addressesIndex[firstIndex], this.transaction._fromAddresses[firstIndex]);
  //           credentials.push(
  //             new Credential(
  //               ['', this.transaction._fromAddresses[firstIndex].toString()].map(
  //                 utils.createSig
  //               ) as unknown as Signature[]
  //             )
  //           );
  //         } else {
  //           // secpTransferInput.addSignatureIdx(addressesIndex[firstIndex], this.transaction._fromAddresses[firstIndex]);
  //           // secpTransferInput.addSignatureIdx(addressesIndex[bitgoIndex], this.transaction._fromAddresses[bitgoIndex]);
  //           credentials.push(
  //             new Credential(
  //               [this.transaction._fromAddresses[firstIndex].toString(), ''].map(
  //                 utils.createSig
  //               ) as unknown as Signature[]
  //             )
  //           );
  //         }
  //       }
  //
  //       // const input: avaxSerial.TransferableInput = new avaxSerial.TransferableInput(
  //       //   UTXOID, // TODO(CR-1073): how do we get this ? For this we need UTXO not decodedUTXO obj
  //       //   Id.fromHex(Buffer.from(this.transaction._assetId).toString('hex')),
  //       //   secpTransferInput
  //       // );
  //       // inputs.push(input);
  //     }
  //   });
  //
  //   if (buildOutputs) {
  //     if (currentTotal < totalTarget) {
  //       throw new BuildTransactionError(
  //         `Utxo outputs get ${currentTotal.toString()} and ${totalTarget.toString()} is required`
  //       );
  //     } else if (currentTotal > totalTarget) {
  //       outputs.push(
  //         avaxSerial.TransferableOutput.fromNative(
  //           this.transaction._assetId,
  //           currentTotal - totalTarget,
  //           this.transaction._fromAddresses,
  //           this.transaction._locktime,
  //           this.transaction._threshold
  //         )
  //       );
  //     }
  //   }
  //   // get outputs and credentials from the deserialized transaction if we are in OVC
  //   return {
  //     inputs,
  //     // TODO(CR-1073): check this
  //     outputs: !buildOutputs ? this.transaction.avaxPTransaction.outputs : outputs,
  //     credentials: credentials.length === 0 ? this.transaction.credentials : credentials,
  //   };
  // }

  /**
   * Since addresses in outputs get reordered, we need to make sure signatures
   * are added in the correct position
   * To find the position, we use the output's addresses to create the
   * signatureIdx in the order needed (i.e. [user, bitgo, backup])
   * @protected
   */
  protected calculateUtxos(): {
    inputs: avaxSerial.TransferableInput[];
    stakeOutputs: avaxSerial.TransferableOutput[];
    changeOutputs: avaxSerial.TransferableOutput[];
    utxos: Utxo[];
    credentials: Credential[];
  } {
    const inputs: avaxSerial.TransferableInput[] = [];
    const stakeOutputs: avaxSerial.TransferableOutput[] = [];
    const changeOutputs: avaxSerial.TransferableOutput[] = [];
    const utxos: Utxo[] = [];

    let currentTotal = BigInt(0);

    // delegating and validating have no fees
    const totalTarget = this._stakeAmount.valueOf();

    const credentials: Credential[] = [];

    // Convert fromAddresses to string
    // The order of fromAddresses is determined by the source of the data
    // When building from params, the order is [user, bitgo, backup]
    // The order from tx hex is [bitgo, backup, user]
    const bitgoAddresses = this.transaction._fromAddresses.map((b) =>
      utils.addressToString(this.transaction._network.hrp, this.transaction._network.alias, b as BufferAvax)
    );

    // if we are in OVC, none of the utxos will have addresses since they come from
    // deserialized inputs (which don't have addresses), not the IMS
    const buildOutputs =
      this.transaction._utxos[0].addresses.length !== 0 || this.transaction._utxos[0].addressesIndex?.length !== 0;

    const assetId = Id.fromString(this.transaction._assetId);
    this.transaction._utxos.forEach((utxo, index) => {
      // validate the utxos
      if (!utxo) {
        throw new BuildTransactionError('Utxo is undefined');
      }
      // addressesIndex should neve have a mismatch
      if (utxo.addressesIndex?.includes(-1)) {
        throw new BuildTransactionError('Addresses are inconsistent');
      }
      if (utxo.threshold < this.transaction._threshold) {
        throw new BuildTransactionError('Threshold is inconsistent');
      }

      /*
      TODO(CR-1073): verify if the indices below based on the order of `fromAddresses`
        utxo.addressesIndex = [ 2, 0, 1 ] | equivalent to [backup, user, bitgo]?
        we pick 0, 1 for non-recovery |  equivalent to user, bitgo?
        we pick 1, 2 for recovery | equivalent to user, backupp?
      */

      // in WP, output.addressesIndex is empty, so fill it
      if (!utxo.addressesIndex || utxo.addressesIndex.length === 0) {
        utxo.addressesIndex = bitgoAddresses.map((a) => utxo.addresses.indexOf(a));
      }
      // in OVC, output.addressesIndex is defined correctly from the previous iteration

      if (utxo.outputID === SECP256K1_Transfer_Output) {
        const utxoAmount = BigInt(utxo.amount);
        const addressesIndex = utxo.addressesIndex ?? [];

        // TODO(CR-1073): these are used in credentials
        // either user (0) or recovery (2)
        // On regular mode: [user, bitgo] (i.e. [0, 1])
        // On recovery mode: [backup, bitgo] (i.e. [2, 1])
        const firstIndex = this.recoverSigner ? 2 : 0;
        const bitgoIndex = 1;
        // TODO(CR-1073): remove clogs
        console.log('utxo #', index);
        console.log('addressesIndex', JSON.stringify(addressesIndex));
        console.log('firstIndex, bitgoIndex', firstIndex, bitgoIndex);

        currentTotal = currentTotal + utxoAmount;

        const utxoId = avaxSerial.UTXOID.fromNative(utxo.txid, Number(utxo.outputidx));

        const transferInputs = new TransferInput(
          new BigIntPr(utxoAmount),
          new Input(addressesIndex.map((num) => new Int(num)))
        );
        const input = new avaxSerial.TransferableInput(utxoId, assetId, transferInputs);
        utxos.push(new Utxo(utxoId, assetId, transferInputs));

        inputs.push(input);
        if (buildOutputs) {
          // For the bitgo signature we create an empty signature
          // For the user/backup signature we store the address that matches the key
          // if user/backup > bitgo
          if (addressesIndex[bitgoIndex] < addressesIndex[firstIndex]) {
            credentials.push(
              new Credential([
                utils.createNewSig(BufferAvax.from('').toString('hex')),
                utils.createNewSig(BufferAvax.from(this.transaction._fromAddresses[firstIndex]).toString('hex')),
              ])
            );
          } else {
            credentials.push(
              new Credential([
                utils.createNewSig(BufferAvax.from(this.transaction._fromAddresses[firstIndex]).toString('hex')),
                utils.createNewSig(BufferAvax.from('').toString('hex')),
              ])
            );
          }
        } else {
          // TODO(CR-1073): need this else case for OVC
          // addressesIndex.forEach((i) => secpTransferInput.addSignatureIdx(i, this.transaction._fromAddresses[i]));
          // TODO(CR-1073): remove clog
          console.log('buildOutputs === false');
        }
      }
    });

    if (buildOutputs) {
      if (currentTotal < totalTarget) {
        throw new BuildTransactionError(
          `Utxo outputs get ${currentTotal.toString()} and ${totalTarget.toString()} is required`
        );
      } else if (currentTotal >= totalTarget) {
        const stakeOutput = new avaxSerial.TransferableOutput(
          assetId,
          new TransferOutput(
            new BigIntPr(totalTarget),
            new OutputOwners(
              new BigIntPr(this.transaction._locktime),
              new Int(this.transaction._threshold),
              this.transaction._fromAddresses.sort().map((a) => Address.fromBytes(a)[0])
            )
          )
        );
        stakeOutputs.push(stakeOutput);

        if (currentTotal >= totalTarget) {
          const changeOutput = new avaxSerial.TransferableOutput(
            assetId,
            new TransferOutput(
              new BigIntPr(currentTotal - totalTarget),
              new OutputOwners(
                new BigIntPr(this.transaction._locktime),
                new Int(this.transaction._threshold),
                this.transaction._fromAddresses.sort().map((a) => Address.fromBytes(a)[0])
              )
            )
          );
          changeOutputs.push(changeOutput);
        }
      }
    }

    // TODO(CR-1073): Create credentials and return them here
    //  @see createInputOutput() in delegatorTxBuilder.ts
    const finalCredentials = this.transaction.credentials ?? credentials;

    return { inputs, stakeOutputs, changeOutputs, utxos, credentials: finalCredentials };
  }

  /**
   * Build the add validator transaction
   * @protected
   */
  protected buildAvaxTransaction(): void {
    this.validateStakeDuration(this.transaction._startTime, this.transaction._endTime);
    const { inputs, stakeOutputs, changeOutputs, utxos, credentials } = this.calculateUtxos();
    const baseTx = avaxSerial.BaseTx.fromNative(
      this.transaction._networkID,
      this.transaction._blockchainID,
      changeOutputs,
      inputs,
      new Uint8Array() // default empty memo
    );

    const subnetValidator = pvmSerial.SubnetValidator.fromNative(
      this._nodeID,
      this._startTime,
      this._endTime,
      BigInt(1e9),
      networkIDs.PrimaryNetworkID
    );

    // TODO create a `Signer` instead if we have signatures for the tx
    const signer = new pvmSerial.Signer(
      new pvmSerial.ProofOfPossession(
        AvaxUtils.hexToBuffer(this._blsPublicKey),
        AvaxUtils.hexToBuffer(this._blsSignature)
      )
    );

    const outputOwners = new OutputOwners(
      new BigIntPr(this.transaction._locktime),
      new Int(this.transaction._threshold),
      this.transaction._fromAddresses.sort().map((a) => Address.fromBytes(a)[0])
    );

    // TODO(CR-1073): check this value
    //  Shares 10,000 times percentage of reward taken from delegators
    //  https://docs.avax.network/reference/avalanchego/p-chain/txn-format#unsigned-add-validator-tx
    const shares = new Int(1e4 * 20);

    // TODO(CR-1073): Check how addressMaps are created
    //  If we don't reorder them in non-recovery mode, signing with the backup key fails with error:
    //  "index out of bounds", trying to sign on index 2 (@see sign() on transaction.ts)
    //  If the addresses only get reordered when building from hex, we shouldn't need to reorder them here. We would need to do it in initBuilder()
    // const addressMaps = !this.recoverSigner
    //   ? this.transaction._fromAddresses.map((address) => new AvaxUtils.AddressMap([[new Address(address), 0]]))
    //   : [
    //       new AvaxUtils.AddressMap([[new Address(this.transaction._fromAddresses[2]), 0]]),
    //       new AvaxUtils.AddressMap([[new Address(this.transaction._fromAddresses[0]), 0]]),
    //       new AvaxUtils.AddressMap([[new Address(this.transaction._fromAddresses[1]), 0]]),
    //     ];

    const addressMaps = this.transaction._fromAddresses
      .sort()
      .map((address) => new AvaxUtils.AddressMap([[new Address(address), 0]]));

    this.transaction.setTransaction(
      new UnsignedTx(
        new pvmSerial.AddPermissionlessValidatorTx(
          baseTx,
          subnetValidator,
          signer,
          stakeOutputs,
          outputOwners,
          outputOwners,
          shares
        ),
        utxos,
        new AvaxUtils.AddressMaps(addressMaps),
        credentials
      )
    );
  }

  /** @inheritdoc */
  protected signImplementation({ key }: BaseKey): Transaction {
    this._signer.push(new KeyPair({ prv: key }));
    return this.transaction;
  }

  /** @inheritdoc */
  validateAddress(address: BaseAddress, addressFormat?: string): void {
    if (!utils.isValidAddress(address.address)) {
      throw new BuildTransactionError('Invalid address');
    }
  }

  /** @inheritdoc */
  protected get transaction(): Transaction {
    return this._transaction;
  }

  protected set transaction(transaction: Transaction) {
    this._transaction = transaction;
  }

  hasSigner(): boolean {
    return this._signer !== undefined && this._signer.length > 0;
  }

  /** @inheritdoc */
  validateKey({ key }: BaseKey): void {
    if (!new KeyPair({ prv: key })) {
      throw new BuildTransactionError('Invalid key');
    }
  }

  /**
   * Check the raw transaction has a valid format in the blockchain context, throw otherwise.
   *
   * @param rawTransaction Transaction in any format
   */
  validateRawTransaction(rawTransaction: string): void {
    utils.validateRawTransaction(rawTransaction);
  }

  /** @inheritdoc */
  validateTransaction(transaction?: Transaction): void {
    // throw new NotImplementedError('validateTransaction not implemented');
  }

  /** @inheritdoc */
  validateValue(value: BigNumber): void {
    if (value.isLessThan(0)) {
      throw new BuildTransactionError('Value cannot be less than zero');
    }
  }
}
