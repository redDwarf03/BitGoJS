import { AddressFormat, BaseUtils } from '@bitgo/sdk-core';
import {
  BaseAddress,
  PublicKey,
  Ed25519Signature,
  NetworkInfo,
  Credential,
  RewardAddress,
  Transaction as CardanoTransaction,
  DRep,
  Ed25519KeyHash,
  ScriptHash,
  DRepKind,
} from '@emurgo/cardano-serialization-lib-nodejs';
import { KeyPair } from './keyPair';
import { bech32 } from 'bech32';

export const MIN_ADA_FOR_ONE_ASSET = '1500000';
export const VOTE_ALWAYS_ABSTAIN = 'always-abstain';
export const VOTE_ALWAYS_NO_CONFIDENCE = 'always-no-confidence';

export class Utils implements BaseUtils {
  createBaseAddressWithStakeAndPaymentKey(
    stakeKeyPair: KeyPair,
    paymentKeyPair: KeyPair,
    network: AddressFormat
  ): string {
    let baseAddr;
    if (network === AddressFormat.mainnet) {
      // 1. create stake pubKey
      const key = stakeKeyPair.getKeys().pub;

      const stakePub = PublicKey.from_bytes(Buffer.from(key, 'hex'));
      // 2. create payment pubKey
      const paymentPub = PublicKey.from_bytes(Buffer.from(paymentKeyPair.getKeys().pub, 'hex'));
      // 3. create full base address for staking
      baseAddr = BaseAddress.new(
        NetworkInfo.mainnet().network_id(),
        Credential.from_keyhash(paymentPub.hash()),
        Credential.from_keyhash(stakePub.hash())
      );
      return baseAddr.to_address().to_bech32();
    } else if (network === AddressFormat.testnet) {
      // 1. create stake pubKey
      const stakePub = PublicKey.from_bytes(Buffer.from(stakeKeyPair.getKeys().pub, 'hex'));
      // 2. create payment pubKey
      const paymentPub = PublicKey.from_bytes(Buffer.from(paymentKeyPair.getKeys().pub, 'hex'));
      // 3. create full base address for staking
      const baseAddr = BaseAddress.new(
        NetworkInfo.testnet_preprod().network_id(),
        Credential.from_keyhash(paymentPub.hash()),
        Credential.from_keyhash(stakePub.hash())
      );
      return baseAddr.to_address().to_bech32();
    } else {
      throw new Error('Improper Network Type!');
    }
  }

  validateBlake2b(hash: string): boolean {
    if (!hash) {
      return false;
    }
    if (hash.length !== 64) {
      return false;
    }
    return hash.match(/^[a-zA-Z0-9]+$/) !== null;
  }

  getRewardAddress(stakingPubKey: string, coinName: string): string {
    const stakePub = PublicKey.from_bytes(Buffer.from(stakingPubKey, 'hex'));
    let rewardAddress;
    if (coinName === 'ada') {
      rewardAddress = RewardAddress.new(NetworkInfo.mainnet().network_id(), Credential.from_keyhash(stakePub.hash()));
    } else {
      rewardAddress = RewardAddress.new(
        NetworkInfo.testnet_preprod().network_id(),
        Credential.from_keyhash(stakePub.hash())
      );
    }
    return rewardAddress.to_address().to_bech32();
  }

  isValidDRepId(dRepId: string): boolean {
    try {
      this.getDRepFromDRepId(dRepId);
      return true;
    } catch (err) {
      return false;
    }
  }

  getDRepFromDRepId(dRepId: string): DRep {
    switch (dRepId) {
      case 'always-abstain':
        return DRep.new_always_abstain();
      case 'always-no-confidence':
        return DRep.new_always_no_confidence();
      default:
        try {
          // for parsing CIP-105 standard DRep ID
          return DRep.from_bech32(dRepId);
        } catch (err) {
          // for parsing CIP-129 standard DRep ID
          // https://cips.cardano.org/cip/CIP-0129
          const decodedBech32 = bech32.decode(dRepId);
          const decodedBytes = Buffer.from(bech32.fromWords(decodedBech32.words));
          const header = decodedBytes[0];
          const keyBytes = decodedBytes.subarray(1);

          const keyType = (header & 0xf0) >> 4;
          const credentialType = header & 0x0f;

          if (keyType !== 0x02) {
            throw new Error('Invalid key type for DRep');
          }

          switch (credentialType) {
            case 0x02:
              const ed25519KeyHash = Ed25519KeyHash.from_bytes(keyBytes);
              return DRep.new_key_hash(ed25519KeyHash);
            case 0x03:
              const scriptHash = ScriptHash.from_bytes(keyBytes);
              return DRep.new_script_hash(scriptHash);
            default:
              throw new Error('Invalid credential type for DRep');
          }
        }
    }
  }

  getDRepIdFromDRep(dRep: DRep): string {
    switch (dRep.kind()) {
      case DRepKind.AlwaysAbstain:
        return VOTE_ALWAYS_ABSTAIN;
      case DRepKind.AlwaysNoConfidence:
        return VOTE_ALWAYS_NO_CONFIDENCE;
      default:
        return dRep.to_bech32();
    }
  }

  /** @inheritdoc */
  // this will validate both stake and payment addresses
  isValidAddress(address: string): boolean {
    const bech32PrefixList = ['addr', 'addr_test', 'stake', 'stake_test'];
    const BASE_ADDR_LEN = 92;
    const REWARD_AND_ENTERPRISE_ADDR_LEN = 47;
    const POINTER_ADDR_LEN = 52;
    const VALIDATOR_ADDR_LEN = 56;

    // test if this is a bech32 address first
    if (new RegExp(bech32PrefixList.join('|')).test(address)) {
      try {
        const decodedBech = bech32.decode(address, 108);
        const wordLength = decodedBech.words.length;
        if (!bech32PrefixList.includes(decodedBech.prefix)) {
          return false;
        }
        return (
          wordLength === BASE_ADDR_LEN ||
          wordLength === REWARD_AND_ENTERPRISE_ADDR_LEN ||
          wordLength === POINTER_ADDR_LEN
        );
      } catch (err) {
        return false;
      }
    } else {
      // maybe this is a validator address
      return new RegExp(`^(?!pool)[a-z0-9]\{${VALIDATOR_ADDR_LEN}\}$`).test(address);
    }
  }

  /** @inheritdoc */
  isValidBlockId(hash: string): boolean {
    return this.validateBlake2b(hash);
  }

  /** @inheritdoc */
  isValidPrivateKey(key: string): boolean {
    // this will return true for both extended and non-extended ED25519 keys
    return this.isValidKey(key);
  }

  isValidKey(key: string): boolean {
    try {
      new KeyPair({ prv: key });
      return true;
    } catch {
      return false;
    }
  }

  /** @inheritdoc */
  isValidPublicKey(pubKey: string): boolean {
    try {
      new KeyPair({ pub: pubKey });
      return true;
    } catch {
      return false;
    }
  }

  /** @inheritdoc */
  isValidSignature(signature: string): boolean {
    try {
      Ed25519Signature.from_hex(signature);
      return true;
    } catch (err) {
      return false;
    }
  }

  /** @inheritdoc */
  isValidTransactionId(txId: string): boolean {
    return this.validateBlake2b(txId);
  }

  /**
   * Get the transaction body from a serialized transaction
   * @param {string} serializedTx - serialized transaction in hex or base64 format
   * @returns {string} transaction body in hex format
   */
  getTransactionBody(serializedTx: string): string {
    const HEX_REGEX = /^[0-9a-fA-F]+$/;
    const bufferRawTransaction = HEX_REGEX.test(serializedTx)
      ? Buffer.from(serializedTx, 'hex')
      : Buffer.from(serializedTx, 'base64');
    return Buffer.from(CardanoTransaction.from_bytes(bufferRawTransaction).body().to_bytes()).toString('hex');
  }
}

const utils = new Utils();

export default utils;
