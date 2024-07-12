import { bigIntToBufferBE, DklsComms, DklsDkg, DklsDsg, DklsTypes } from '@bitgo/sdk-lib-mpc';
import assert from 'assert';
import { Buffer } from 'buffer';
import { Hash } from 'crypto';
import { NonEmptyString } from 'io-ts-types';
import createKeccakHash from 'keccak';
import * as pgp from 'openpgp';
import {
  KeyGenTypeEnum,
  MPCv2BroadcastMessage,
  MPCv2KeyGenRound1Response,
  MPCv2KeyGenRound2Response,
  MPCv2KeyGenRound3Response,
  MPCv2KeyGenState,
  MPCv2KeyGenStateEnum,
  MPCv2P2PMessage,
  MPCv2PartyFromStringOrNumber,
  MPCv2SignatureShareRound1Output,
  MPCv2SignatureShareRound2Output,
} from '@bitgo/public-types';

import { Ecdsa } from '../../../../account-lib';
import { KeychainsTriplet } from '../../../baseCoin';
import { AddKeychainOptions, Keychain, KeyType } from '../../../keychain';
import { DecryptedRetrofitPayload } from '../../../keychain/iKeychains';
import { ECDSAMethodTypes, getTxRequest } from '../../../tss';
import { sendSignatureShareV2, sendTxRequest } from '../../../tss/common';
import {
  getSignatureShareRoundOne,
  getSignatureShareRoundThree,
  getSignatureShareRoundTwo,
  verifyBitGoMessagesAndSignaturesRoundOne,
  verifyBitGoMessagesAndSignaturesRoundTwo,
} from '../../../tss/ecdsa/ecdsaMPCv2';
import { KeyCombined } from '../../../tss/ecdsa/types';
import { generateGPGKeyPair } from '../../opengpgUtils';
import {
  CustomMPCv2SigningRound1GeneratingFunction,
  CustomMPCv2SigningRound2GeneratingFunction,
  CustomMPCv2SigningRound3GeneratingFunction,
  RequestType,
  SignatureShareRecord,
  TSSParams,
  TSSParamsForMessage,
  TSSParamsWithPrv,
  TxRequest,
} from '../baseTypes';
import { BaseEcdsaUtils } from './base';
import { GenerateMPCv2KeyRequestBody, GenerateMPCv2KeyRequestResponse, MPCv2PartiesEnum } from './typesMPCv2';

export class EcdsaMPCv2Utils extends BaseEcdsaUtils {
  /** @inheritdoc */
  async createKeychains(params: {
    passphrase: string;
    enterprise: string;
    originalPasscodeEncryptionCode?: string;
    retrofit?: DecryptedRetrofitPayload;
  }): Promise<KeychainsTriplet> {
    const { userSession, backupSession } = this.getUserAndBackupSession(2, 3, params.retrofit);
    const userGpgKey = await generateGPGKeyPair('secp256k1');
    const backupGpgKey = await generateGPGKeyPair('secp256k1');

    // Get the BitGo public key based on user/enterprise feature flags
    // If it doesn't work, use the default public key from the constants
    const bitgoPublicGpgKey = (
      (await this.getBitgoGpgPubkeyBasedOnFeatureFlags(params.enterprise, true)) ?? this.bitgoMPCv2PublicGpgKey
    ).armor();

    const userGpgPrvKey: DklsTypes.PartyGpgKey = {
      partyId: MPCv2PartiesEnum.USER,
      gpgKey: userGpgKey.privateKey,
    };
    const backupGpgPrvKey: DklsTypes.PartyGpgKey = {
      partyId: MPCv2PartiesEnum.BACKUP,
      gpgKey: backupGpgKey.privateKey,
    };
    const bitgoGpgPubKey: DklsTypes.PartyGpgKey = {
      partyId: MPCv2PartiesEnum.BITGO,
      gpgKey: bitgoPublicGpgKey,
    };

    // #region round 1
    const userRound1BroadcastMsg = await userSession.initDkg();
    const backupRound1BroadcastMsg = await backupSession.initDkg();

    const round1SerializedMessages = DklsTypes.serializeMessages({
      broadcastMessages: [userRound1BroadcastMsg, backupRound1BroadcastMsg],
      p2pMessages: [],
    });
    const round1Messages = await DklsComms.encryptAndAuthOutgoingMessages(
      round1SerializedMessages,
      [bitgoGpgPubKey],
      [userGpgPrvKey, backupGpgPrvKey]
    );

    const { sessionId, bitgoMsg1, bitgoToBackupMsg2, bitgoToUserMsg2 } = await this.sendKeyGenerationRound1(
      params.enterprise,
      userGpgKey.publicKey,
      backupGpgKey.publicKey,
      params.retrofit?.walletId
        ? {
            ...round1Messages,
            walletId: params.retrofit.walletId,
          }
        : round1Messages
    );
    // #endregion

    // #region round 2
    const bitgoRound1BroadcastMessages = await DklsComms.decryptAndVerifyIncomingMessages(
      { p2pMessages: [], broadcastMessages: [this.formatBitgoBroadcastMessage(bitgoMsg1)] },
      [bitgoGpgPubKey],
      [userGpgPrvKey, backupGpgPrvKey]
    );
    const bitgoRound1BroadcastMsg = bitgoRound1BroadcastMessages.broadcastMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BITGO
    );
    assert(bitgoRound1BroadcastMsg, 'BitGo message 1 not found in broadcast messages');

    const userRound2P2PMessages = userSession.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [DklsTypes.deserializeBroadcastMessage(bitgoRound1BroadcastMsg), backupRound1BroadcastMsg],
    });

    const userToBitgoMsg2 = userRound2P2PMessages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.USER && m.to === MPCv2PartiesEnum.BITGO
    );
    assert(userToBitgoMsg2, 'User message 2 not found in P2P messages');
    const serializedUserToBitgoMsg2 = DklsTypes.serializeP2PMessage(userToBitgoMsg2);

    const backupRound2P2PMessages = backupSession.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [userRound1BroadcastMsg, DklsTypes.deserializeBroadcastMessage(bitgoRound1BroadcastMsg)],
    });
    const serializedBackupToBitgoMsg2 = DklsTypes.serializeMessages(backupRound2P2PMessages).p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BACKUP && m.to === MPCv2PartiesEnum.BITGO
    );
    assert(serializedBackupToBitgoMsg2, 'Backup message 2 not found in P2P messages');

    const round2Messages = await DklsComms.encryptAndAuthOutgoingMessages(
      { p2pMessages: [serializedUserToBitgoMsg2, serializedBackupToBitgoMsg2], broadcastMessages: [] },
      [bitgoGpgPubKey],
      [userGpgPrvKey, backupGpgPrvKey]
    );

    const {
      sessionId: sessionIdRound2,
      bitgoCommitment2,
      bitgoToUserMsg3,
      bitgoToBackupMsg3,
    } = await this.sendKeyGenerationRound2(params.enterprise, sessionId, round2Messages);
    // #endregion

    // #region round 3
    assert.equal(sessionId, sessionIdRound2, 'Round 1 and 2 Session IDs do not match');
    const decryptedBitgoToUserRound2Msgs = await DklsComms.decryptAndVerifyIncomingMessages(
      { p2pMessages: [this.formatP2PMessage(bitgoToUserMsg2)], broadcastMessages: [] },
      [bitgoGpgPubKey],
      [userGpgPrvKey]
    );
    const serializedBitgoToUserRound2Msg = decryptedBitgoToUserRound2Msgs.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BITGO && m.to === MPCv2PartiesEnum.USER
    );
    assert(serializedBitgoToUserRound2Msg, 'BitGo to User message 2 not found in P2P messages');
    const bitgoToUserRound2Msg = DklsTypes.deserializeP2PMessage(serializedBitgoToUserRound2Msg);

    const decryptedBitgoToBackupRound2Msg = await DklsComms.decryptAndVerifyIncomingMessages(
      { p2pMessages: [this.formatP2PMessage(bitgoToBackupMsg2)], broadcastMessages: [] },
      [bitgoGpgPubKey],
      [backupGpgPrvKey]
    );
    const serializedBitgoToBackupRound2Msg = decryptedBitgoToBackupRound2Msg.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BITGO && m.to === MPCv2PartiesEnum.BACKUP
    );
    assert(serializedBitgoToBackupRound2Msg, 'BitGo to Backup message 2 not found in P2P messages');
    const bitgoToBackupRound2Msg = DklsTypes.deserializeP2PMessage(serializedBitgoToBackupRound2Msg);

    const userToBackupMsg2 = userRound2P2PMessages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.USER && m.to === MPCv2PartiesEnum.BACKUP
    );
    assert(userToBackupMsg2, 'User to Backup message 2 not found in P2P messages');

    const backupToUserMsg2 = backupRound2P2PMessages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BACKUP && m.to === MPCv2PartiesEnum.USER
    );
    assert(backupToUserMsg2, 'Backup to User message 2 not found in P2P messages');

    const userRound3Messages = userSession.handleIncomingMessages({
      broadcastMessages: [],
      p2pMessages: [bitgoToUserRound2Msg, backupToUserMsg2],
    });
    const userToBackupMsg3 = userRound3Messages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.USER && m.to === MPCv2PartiesEnum.BACKUP
    );
    assert(userToBackupMsg3, 'User to Backup message 3 not found in P2P messages');
    const userToBitgoMsg3 = userRound3Messages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.USER && m.to === MPCv2PartiesEnum.BITGO
    );
    assert(userToBitgoMsg3, 'User to Bitgo message 3 not found in P2P messages');
    const serializedUserToBitgoMsg3 = DklsTypes.serializeP2PMessage(userToBitgoMsg3);

    const backupRound3Messages = backupSession.handleIncomingMessages({
      broadcastMessages: [],
      p2pMessages: [bitgoToBackupRound2Msg, userToBackupMsg2],
    });

    const backupToUserMsg3 = backupRound3Messages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BACKUP && m.to === MPCv2PartiesEnum.USER
    );
    assert(backupToUserMsg3, 'Backup to User message 3 not found in P2P messages');
    const backupToBitgoMsg3 = backupRound3Messages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BACKUP && m.to === MPCv2PartiesEnum.BITGO
    );
    assert(backupToBitgoMsg3, 'Backup to Bitgo message 3 not found in P2P messages');
    const serializedBackupToBitgoMsg3 = DklsTypes.serializeP2PMessage(backupToBitgoMsg3);

    const decryptedBitgoToUserRound3Messages = await DklsComms.decryptAndVerifyIncomingMessages(
      { broadcastMessages: [], p2pMessages: [this.formatP2PMessage(bitgoToUserMsg3, bitgoCommitment2)] },
      [bitgoGpgPubKey],
      [userGpgPrvKey]
    );
    const serializedBitgoToUserRound3Msg = decryptedBitgoToUserRound3Messages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BITGO && m.to === MPCv2PartiesEnum.USER
    );
    assert(serializedBitgoToUserRound3Msg, 'BitGo to User message 3 not found in P2P messages');
    const bitgoToUserRound3Msg = DklsTypes.deserializeP2PMessage(serializedBitgoToUserRound3Msg);

    const decryptedBitgoToBackupRound3Messages = await DklsComms.decryptAndVerifyIncomingMessages(
      { broadcastMessages: [], p2pMessages: [this.formatP2PMessage(bitgoToBackupMsg3, bitgoCommitment2)] },
      [bitgoGpgPubKey],
      [backupGpgPrvKey]
    );
    const serializedBitgoToBackupRound3Msg = decryptedBitgoToBackupRound3Messages.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BITGO && m.to === MPCv2PartiesEnum.BACKUP
    );
    assert(serializedBitgoToBackupRound3Msg, 'BitGo to Backup message 3 not found in P2P messages');
    const bitgoToBackupRound3Msg = DklsTypes.deserializeP2PMessage(serializedBitgoToBackupRound3Msg);

    const userRound4Messages = userSession.handleIncomingMessages({
      p2pMessages: [backupToUserMsg3, bitgoToUserRound3Msg],
      broadcastMessages: [],
    });

    const userRound4BroadcastMsg = userRound4Messages.broadcastMessages.find((m) => m.from === MPCv2PartiesEnum.USER);
    assert(userRound4BroadcastMsg, 'User message 4 not found in broadcast messages');
    const serializedUserRound4BroadcastMsg = DklsTypes.serializeBroadcastMessage(userRound4BroadcastMsg);

    const backupRound4Messages = backupSession.handleIncomingMessages({
      p2pMessages: [userToBackupMsg3, bitgoToBackupRound3Msg],
      broadcastMessages: [],
    });
    const backupRound4BroadcastMsg = backupRound4Messages.broadcastMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BACKUP
    );
    assert(backupRound4BroadcastMsg, 'Backup message 4 not found in broadcast messages');
    const serializedBackupRound4BroadcastMsg = DklsTypes.serializeBroadcastMessage(backupRound4BroadcastMsg);

    const round3Messages = await DklsComms.encryptAndAuthOutgoingMessages(
      {
        p2pMessages: [serializedUserToBitgoMsg3, serializedBackupToBitgoMsg3],
        broadcastMessages: [serializedUserRound4BroadcastMsg, serializedBackupRound4BroadcastMsg],
      },
      [bitgoGpgPubKey],
      [userGpgPrvKey, backupGpgPrvKey]
    );

    const {
      sessionId: sessionIdRound3,
      bitgoMsg4,
      commonKeychain: bitgoCommonKeychain,
    } = await this.sendKeyGenerationRound3(params.enterprise, sessionId, round3Messages);

    // #endregion

    // #region keychain creation
    assert.equal(sessionId, sessionIdRound3, 'Round 1 and 3 Session IDs do not match');
    const bitgoRound4BroadcastMessages = DklsTypes.deserializeMessages(
      await DklsComms.decryptAndVerifyIncomingMessages(
        { p2pMessages: [], broadcastMessages: [this.formatBitgoBroadcastMessage(bitgoMsg4)] },
        [bitgoGpgPubKey],
        []
      )
    ).broadcastMessages;
    const bitgoRound4BroadcastMsg = bitgoRound4BroadcastMessages.find((m) => m.from === MPCv2PartiesEnum.BITGO);

    assert(bitgoRound4BroadcastMsg, 'BitGo message 4 not found in broadcast messages');
    userSession.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [bitgoRound4BroadcastMsg, backupRound4BroadcastMsg],
    });

    backupSession.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [bitgoRound4BroadcastMsg, userRound4BroadcastMsg],
    });

    const userPrivateMaterial = userSession.getKeyShare();
    const backupPrivateMaterial = backupSession.getKeyShare();
    const userReducedPrivateMaterial = userSession.getReducedKeyShare();
    const backupReducedPrivateMaterial = backupSession.getReducedKeyShare();

    const userCommonKeychain = DklsTypes.getCommonKeychain(userPrivateMaterial);
    const backupCommonKeychain = DklsTypes.getCommonKeychain(backupPrivateMaterial);

    assert.equal(bitgoCommonKeychain, userCommonKeychain, 'User and Bitgo Common keychains do not match');
    assert.equal(bitgoCommonKeychain, backupCommonKeychain, 'Backup and Bitgo Common keychains do not match');

    const userKeychainPromise = this.addUserKeychain(
      bitgoCommonKeychain,
      userPrivateMaterial,
      userReducedPrivateMaterial,
      params.passphrase,
      params.originalPasscodeEncryptionCode
    );
    const backupKeychainPromise = this.addBackupKeychain(
      bitgoCommonKeychain,
      userPrivateMaterial,
      backupReducedPrivateMaterial,
      params.passphrase,
      params.originalPasscodeEncryptionCode
    );
    const bitgoKeychainPromise = this.addBitgoKeychain(bitgoCommonKeychain);

    const [userKeychain, backupKeychain, bitgoKeychain] = await Promise.all([
      userKeychainPromise,
      backupKeychainPromise,
      bitgoKeychainPromise,
    ]);
    // #endregion

    return {
      userKeychain,
      backupKeychain,
      bitgoKeychain,
    };
  }

  // #region keychain utils
  async createParticipantKeychain(
    participantIndex: MPCv2PartyFromStringOrNumber,
    commonKeychain: string,
    privateMaterial?: Buffer,
    reducedPrivateMaterial?: Buffer,
    passphrase?: string,
    originalPasscodeEncryptionCode?: string
  ): Promise<Keychain> {
    let source: string;
    let encryptedPrv: string | undefined = undefined;
    let reducedEncryptedPrv: string | undefined = undefined;
    switch (participantIndex) {
      case MPCv2PartiesEnum.USER:
      case MPCv2PartiesEnum.BACKUP:
        source = participantIndex === MPCv2PartiesEnum.USER ? 'user' : 'backup';
        assert(privateMaterial, `Private material is required for ${source} keychain`);
        assert(reducedPrivateMaterial, `Reduced private material is required for ${source} keychain`);
        assert(passphrase, `Passphrase is required for ${source} keychain`);
        encryptedPrv = this.bitgo.encrypt({
          input: privateMaterial.toString('base64'),
          password: passphrase,
        });
        reducedEncryptedPrv = this.bitgo.encrypt({
          // Buffer.toString('base64') can not be used here as it does not work on the browser.
          // The browser deals with a Buffer as Uint8Array, therefore in the browser .toString('base64') just creates a comma seperated string of the array values.
          input: btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(reducedPrivateMaterial)))),
          password: passphrase,
        });
        break;
      case MPCv2PartiesEnum.BITGO:
        source = 'bitgo';
        break;
      default:
        throw new Error('Invalid participant index');
    }

    const recipientKeychainParams: AddKeychainOptions = {
      source,
      keyType: 'tss' as KeyType,
      commonKeychain,
      encryptedPrv,
      originalPasscodeEncryptionCode,
      isMPCv2: true,
    };

    const keychains = this.baseCoin.keychains();
    return { ...(await keychains.add(recipientKeychainParams)), reducedEncryptedPrv: reducedEncryptedPrv };
  }

  /**
   * Converts user and backup MPCv1 SigningMaterial to RetrofitData needed by MPCv2 DKG.
   *
   * @param {Object} params - MPCv1 decrypted signing material for user and backup as a json.stringify string and bitgo's Big Si.
   * @returns {{ mpcv2UserKeyShare: DklsTypes.RetrofitData; mpcv2BakcupKeyShare: DklsTypes.RetrofitData }} - the retrofit data needed to start an MPCv2 DKG session.
   */
  getMpcV2RetrofitDataFromMpcV1Keys(params: { mpcv1UserKeyShare: string; mpcv1BackupKeyShare: string }): {
    mpcv2UserKeyShare: DklsTypes.RetrofitData;
    mpcv2BakcupKeyShare: DklsTypes.RetrofitData;
  } {
    const mpc = new Ecdsa();
    const xiList = [
      Array.from(bigIntToBufferBE(BigInt(1), 32)),
      Array.from(bigIntToBufferBE(BigInt(2), 32)),
      Array.from(bigIntToBufferBE(BigInt(3), 32)),
    ];
    return {
      mpcv2UserKeyShare: this.getMpcV2RetrofitDataFromMpcV1Key({
        mpcv1PartyKeyShare: params.mpcv1UserKeyShare,
        mpcv1PartyIndex: 1,
        xiList,
        mpc,
      }),
      mpcv2BakcupKeyShare: this.getMpcV2RetrofitDataFromMpcV1Key({
        mpcv1PartyKeyShare: params.mpcv1BackupKeyShare,
        mpcv1PartyIndex: 2,
        xiList,
        mpc,
      }),
    };
  }

  getMpcV2RetrofitDataFromMpcV1Key({
    mpcv1PartyKeyShare,
    mpcv1PartyIndex,
    xiList,
    mpc,
  }: {
    mpcv1PartyKeyShare: string;
    mpcv1PartyIndex: number;
    xiList: number[][];
    mpc: Ecdsa;
  }): DklsTypes.RetrofitData {
    const signingMaterial: ECDSAMethodTypes.SigningMaterial = JSON.parse(mpcv1PartyKeyShare);
    let keyCombined: KeyCombined | undefined = undefined;
    switch (mpcv1PartyIndex) {
      case 1:
        assert(signingMaterial.backupNShare, 'User MPCv1 key material should have backup NShare.');
        assert(signingMaterial.bitgoNShare, 'BitGo MPCv1 key material should have user NShare.');
        keyCombined = mpc.keyCombine(signingMaterial.pShare, [
          signingMaterial.backupNShare,
          signingMaterial.bitgoNShare,
        ]);
        break;
      case 2:
        assert(signingMaterial.userNShare, 'User MPCv1 key material should have backup NShare.');
        assert(signingMaterial.bitgoNShare, 'BitGo MPCv1 key material should have user NShare.');
        keyCombined = mpc.keyCombine(signingMaterial.pShare, [signingMaterial.userNShare, signingMaterial.bitgoNShare]);
        break;
      case 3:
        assert(signingMaterial.userNShare, 'User MPCv1 key material should have backup NShare.');
        assert(signingMaterial.backupNShare, 'Backup MPCv1 key material should have user NShare.');
        keyCombined = mpc.keyCombine(signingMaterial.pShare, [
          signingMaterial.userNShare,
          signingMaterial.backupNShare,
        ]);
        break;
      default:
        throw new Error('Invalid participant index');
    }
    return {
      xShare: keyCombined.xShare,
      xiList: xiList,
    };
  }

  private async addUserKeychain(
    commonKeychain: string,
    privateMaterial: Buffer,
    reducedPrivateMaterial: Buffer,
    passphrase: string,
    originalPasscodeEncryptionCode?: string
  ): Promise<Keychain> {
    return this.createParticipantKeychain(
      MPCv2PartiesEnum.USER,
      commonKeychain,
      privateMaterial,
      reducedPrivateMaterial,
      passphrase,
      originalPasscodeEncryptionCode
    );
  }

  private async addBackupKeychain(
    commonKeychain: string,
    privateMaterial: Buffer,
    reducedPrivateMaterial: Buffer,
    passphrase: string,
    originalPasscodeEncryptionCode?: string
  ): Promise<Keychain> {
    return this.createParticipantKeychain(
      MPCv2PartiesEnum.BACKUP,
      commonKeychain,
      privateMaterial,
      reducedPrivateMaterial,
      passphrase,
      originalPasscodeEncryptionCode
    );
  }

  private getUserAndBackupSession(m: number, n: number, retrofit?: DecryptedRetrofitPayload) {
    if (retrofit) {
      const retrofitData = this.getMpcV2RetrofitDataFromMpcV1Keys({
        mpcv1UserKeyShare: retrofit.decryptedUserKey,
        mpcv1BackupKeyShare: retrofit.decryptedBackupKey,
      });

      const userSession = new DklsDkg.Dkg(n, m, MPCv2PartiesEnum.USER, undefined, retrofitData.mpcv2UserKeyShare);
      const backupSession = new DklsDkg.Dkg(n, m, MPCv2PartiesEnum.BACKUP, undefined, retrofitData.mpcv2BakcupKeyShare);

      return { userSession, backupSession };
    }

    const userSession = new DklsDkg.Dkg(n, m, MPCv2PartiesEnum.USER);
    const backupSession = new DklsDkg.Dkg(n, m, MPCv2PartiesEnum.BACKUP);

    return { userSession, backupSession };
  }

  private async addBitgoKeychain(commonKeychain: string): Promise<Keychain> {
    return this.createParticipantKeychain(MPCv2PartiesEnum.BITGO, commonKeychain);
  }
  // #endregion

  // #region generate key request utils
  private async sendKeyGenerationRequest<T extends GenerateMPCv2KeyRequestResponse>(
    enterprise: string,
    round: MPCv2KeyGenState,
    payload: GenerateMPCv2KeyRequestBody & { walletId?: string }
  ): Promise<T> {
    return this.bitgo
      .post(this.bitgo.url('/mpc/generatekey', 2))
      .send({ enterprise, type: KeyGenTypeEnum.MPCv2, round, payload })
      .result();
  }

  private async sendKeyGenerationRound1(
    enterprise: string,
    userGpgPublicKey: string,
    backupGpgPublicKey: string,
    payload: DklsTypes.AuthEncMessages & { walletId?: string }
  ): Promise<MPCv2KeyGenRound1Response> {
    assert(NonEmptyString.is(userGpgPublicKey), 'User GPG public key is required');
    assert(NonEmptyString.is(backupGpgPublicKey), 'Backup GPG public key is required');
    const userMsg1 = payload.broadcastMessages.find((m) => m.from === MPCv2PartiesEnum.USER)?.payload;
    assert(userMsg1, 'User message 1 not found in broadcast messages');
    const backupMsg1 = payload.broadcastMessages.find((m) => m.from === MPCv2PartiesEnum.BACKUP)?.payload;
    assert(backupMsg1, 'Backup message 1 not found in broadcast messages');

    return this.sendKeyGenerationRequest<MPCv2KeyGenRound1Response>(enterprise, MPCv2KeyGenStateEnum['MPCv2-R1'], {
      userGpgPublicKey,
      backupGpgPublicKey,
      userMsg1: { from: 0, ...userMsg1 },
      backupMsg1: { from: 1, ...backupMsg1 },
      walletId: payload.walletId,
    });
  }

  private async sendKeyGenerationRound2(
    enterprise: string,
    sessionId: string,
    payload: DklsTypes.AuthEncMessages
  ): Promise<MPCv2KeyGenRound2Response> {
    assert(NonEmptyString.is(sessionId), 'Session ID is required');
    const userMsg2 = payload.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.USER && m.to === MPCv2PartiesEnum.BITGO
    );
    assert(userMsg2, 'User to Bitgo message 2 not found in P2P messages');
    assert(userMsg2.commitment, 'User to Bitgo commitment not found in P2P messages');
    assert(NonEmptyString.is(userMsg2.commitment), 'User to Bitgo commitment is required');
    const backupMsg2 = payload.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BACKUP && m.to === MPCv2PartiesEnum.BITGO
    );
    assert(backupMsg2, 'Backup to Bitgo message 2 not found in P2P messages');
    assert(backupMsg2.commitment, 'Backup to Bitgo commitment not found in P2P messages');
    assert(NonEmptyString.is(backupMsg2.commitment), 'Backup to Bitgo commitment is required');

    return this.sendKeyGenerationRequest<MPCv2KeyGenRound2Response>(enterprise, MPCv2KeyGenStateEnum['MPCv2-R2'], {
      sessionId,
      userMsg2: {
        from: MPCv2PartiesEnum.USER,
        to: MPCv2PartiesEnum.BITGO,
        signature: userMsg2.payload.signature,
        encryptedMessage: userMsg2.payload.encryptedMessage,
      },
      userCommitment2: userMsg2.commitment,
      backupMsg2: {
        from: MPCv2PartiesEnum.BACKUP,
        to: MPCv2PartiesEnum.BITGO,
        signature: backupMsg2.payload.signature,
        encryptedMessage: backupMsg2.payload.encryptedMessage,
      },
      backupCommitment2: backupMsg2.commitment,
    });
  }

  private async sendKeyGenerationRound3(
    enterprise: string,
    sessionId: string,
    payload: DklsTypes.AuthEncMessages
  ): Promise<MPCv2KeyGenRound3Response> {
    assert(NonEmptyString.is(sessionId), 'Session ID is required');
    const userMsg3 = payload.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.USER && m.to === MPCv2PartiesEnum.BITGO
    )?.payload;
    assert(userMsg3, 'User to Bitgo message 3 not found in P2P messages');
    const backupMsg3 = payload.p2pMessages.find(
      (m) => m.from === MPCv2PartiesEnum.BACKUP && m.to === MPCv2PartiesEnum.BITGO
    )?.payload;
    assert(backupMsg3, 'Backup to Bitgo message 3 not found in P2P messages');
    const userMsg4 = payload.broadcastMessages.find((m) => m.from === MPCv2PartiesEnum.USER)?.payload;
    assert(userMsg4, 'User message 1 not found in broadcast messages');
    const backupMsg4 = payload.broadcastMessages.find((m) => m.from === MPCv2PartiesEnum.BACKUP)?.payload;
    assert(backupMsg4, 'Backup message 1 not found in broadcast messages');

    return this.sendKeyGenerationRequest<MPCv2KeyGenRound3Response>(enterprise, MPCv2KeyGenStateEnum['MPCv2-R3'], {
      sessionId,
      userMsg3: { from: 0, to: 2, ...userMsg3 },
      backupMsg3: { from: 1, to: 2, ...backupMsg3 },
      userMsg4: { from: 0, ...userMsg4 },
      backupMsg4: { from: 1, ...backupMsg4 },
    });
  }

  // #endregion

  // #region sign tx request

  /**
   * Signs the transaction associated to the transaction request.
   * @param {string | TxRequest} params.txRequest - transaction request object or id
   * @param {string} params.prv - decrypted private key
   * @param {string} params.reqId - request id
   * @returns {Promise<TxRequest>} fully signed TxRequest object
   */
  async signTxRequest(params: TSSParamsWithPrv): Promise<TxRequest> {
    this.bitgo.setRequestTracer(params.reqId);
    return this.signRequestBase(params, RequestType.tx);
  }

  private async signRequestBase(params: TSSParamsWithPrv, requestType: RequestType): Promise<TxRequest> {
    const userKeyShare = Buffer.from(params.prv, 'base64');
    const txRequest: TxRequest =
      typeof params.txRequest === 'string'
        ? await getTxRequest(this.bitgo, this.wallet.id(), params.txRequest, params.reqId)
        : params.txRequest;

    const [userGpgKey, bitgoGpgPubKey] = await Promise.all([
      generateGPGKeyPair('secp256k1'),
      this.getBitgoGpgPubkeyBasedOnFeatureFlags(txRequest.enterpriseId, true, params.reqId).then(
        (pubKey) => pubKey ?? this.bitgoMPCv2PublicGpgKey
      ),
    ]);
    if (!bitgoGpgPubKey) {
      throw new Error('Missing BitGo GPG key for MPCv2');
    }

    const { derivationPath, hashBuffer } = this.getHashStringAndDerivationPath(txRequest, requestType);

    const otherSigner = new DklsDsg.Dsg(userKeyShare, 0, derivationPath, hashBuffer);
    const userSignerBroadcastMsg1 = await otherSigner.init();
    const signatureShareRound1 = await getSignatureShareRoundOne(userSignerBroadcastMsg1, userGpgKey);

    let latestTxRequest = await sendSignatureShareV2(
      this.bitgo,
      txRequest.walletId,
      txRequest.txRequestId,
      [signatureShareRound1],
      RequestType.tx,
      this.baseCoin.getMPCAlgorithm(),
      userGpgKey.publicKey,
      undefined,
      this.wallet.multisigTypeVersion(),
      params.reqId
    );
    assert(latestTxRequest.transactions);

    const bitgoToUserMessages1And2 = latestTxRequest.transactions[0].signatureShares;
    // TODO: Use codec for parsing
    const parsedBitGoToUserSigShareRoundOne = JSON.parse(
      bitgoToUserMessages1And2[bitgoToUserMessages1And2.length - 1].share
    ) as MPCv2SignatureShareRound1Output;
    if (parsedBitGoToUserSigShareRoundOne.type !== 'round1Output') {
      throw new Error('Unexpected signature share response. Unable to parse data.');
    }
    const serializedBitGoToUserMessagesRound1And2 = await verifyBitGoMessagesAndSignaturesRoundOne(
      parsedBitGoToUserSigShareRoundOne,
      userGpgKey,
      bitgoGpgPubKey
    );

    /** Round 2 **/
    const deserializedMessages = DklsTypes.deserializeMessages(serializedBitGoToUserMessagesRound1And2);
    const userToBitGoMessagesRound2 = otherSigner.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: deserializedMessages.broadcastMessages,
    });
    const userToBitGoMessagesRound3 = otherSigner.handleIncomingMessages({
      p2pMessages: deserializedMessages.p2pMessages,
      broadcastMessages: [],
    });
    const signatureShareRoundTwo = await getSignatureShareRoundTwo(
      userToBitGoMessagesRound2,
      userToBitGoMessagesRound3,
      userGpgKey,
      bitgoGpgPubKey
    );
    latestTxRequest = await sendSignatureShareV2(
      this.bitgo,
      txRequest.walletId,
      txRequest.txRequestId,
      [signatureShareRoundTwo],
      RequestType.tx,
      this.baseCoin.getMPCAlgorithm(),
      userGpgKey.publicKey,
      undefined,
      this.wallet.multisigTypeVersion(),
      params.reqId
    );
    assert(latestTxRequest.transactions);

    const txRequestSignatureShares = latestTxRequest.transactions[0].signatureShares;
    // TODO: Use codec for parsing
    const parsedBitGoToUserSigShareRoundTwo = JSON.parse(
      txRequestSignatureShares[txRequestSignatureShares.length - 1].share
    ) as MPCv2SignatureShareRound2Output;
    if (parsedBitGoToUserSigShareRoundTwo.type !== 'round2Output') {
      throw new Error('Unexpected signature share response. Unable to parse data.');
    }
    const serializedBitGoToUserMessagesRound3 = await verifyBitGoMessagesAndSignaturesRoundTwo(
      parsedBitGoToUserSigShareRoundTwo,
      userGpgKey,
      bitgoGpgPubKey
    );

    /** Round 3 **/
    const deserializedBitGoToUserMessagesRound3 = DklsTypes.deserializeMessages({
      p2pMessages: serializedBitGoToUserMessagesRound3.p2pMessages,
      broadcastMessages: [],
    });
    const userToBitGoMessagesRound4 = otherSigner.handleIncomingMessages({
      p2pMessages: deserializedBitGoToUserMessagesRound3.p2pMessages,
      broadcastMessages: [],
    });

    const signatureShareRoundThree = await getSignatureShareRoundThree(
      userToBitGoMessagesRound4,
      userGpgKey,
      bitgoGpgPubKey
    );
    // Submit for final signature share combine
    await sendSignatureShareV2(
      this.bitgo,
      txRequest.walletId,
      txRequest.txRequestId,
      [signatureShareRoundThree],
      RequestType.tx,
      this.baseCoin.getMPCAlgorithm(),
      userGpgKey.publicKey,
      undefined,
      this.wallet.multisigTypeVersion(),
      params.reqId
    );

    return sendTxRequest(this.bitgo, txRequest.walletId, txRequest.txRequestId, RequestType.tx, params.reqId);
  }

  // #endregion

  // #region private utils
  private formatBitgoBroadcastMessage(broadcastMessage: MPCv2BroadcastMessage) {
    return {
      from: broadcastMessage.from,
      payload: { message: broadcastMessage.message, signature: broadcastMessage.signature },
    };
  }

  private formatP2PMessage(p2pMessage: MPCv2P2PMessage, commitment?: string) {
    return {
      payload: { encryptedMessage: p2pMessage.encryptedMessage, signature: p2pMessage.signature },
      from: p2pMessage.from,
      to: p2pMessage.to,
      commitment,
    };
  }

  /**
   * Get the hash string and derivation path from the transaction request.
   * @param {TxRequest} txRequest - the transaction request object
   * @param {RequestType} requestType - the request type
   * @returns {{ hashBuffer: Buffer; derivationPath: string }} - the hash string and derivation path
   */
  private getHashStringAndDerivationPath(
    txRequest: TxRequest,
    requestType: RequestType = RequestType.tx
  ): { hashBuffer: Buffer; derivationPath: string } {
    let txToSign: string;
    let derivationPath: string;
    if (requestType === RequestType.tx) {
      assert(txRequest.transactions && txRequest.transactions.length === 1, 'Unable to find transactions in txRequest');
      txToSign = txRequest.transactions[0].unsignedTx.signableHex;
      derivationPath = txRequest.transactions[0].unsignedTx.derivationPath;
    } else if (requestType === RequestType.message) {
      // TODO(WP-2176): Add support for message signing
      throw new Error('MPCv2 message signing not supported yet.');
    } else {
      throw new Error('Invalid request type, got: ' + requestType);
    }

    let hash: Hash;
    try {
      hash = this.baseCoin.getHashFunction();
    } catch (err) {
      hash = createKeccakHash('keccak256') as Hash;
    }
    const hashBuffer = hash.update(Buffer.from(txToSign, 'hex')).digest();

    return { hashBuffer, derivationPath };
  }

  /**
   * Gets the BitGo and user GPG keys from the BitGo public GPG key and the encrypted user GPG private key.
   * @param {string} bitgoPublicGpgKey  - the BitGo public GPG key
   * @param {string} encryptedUserGpgPrvKey  - the encrypted user GPG private key
   * @param {string} walletPassphrase  - the wallet passphrase
   * @returns {Promise<{ bitgoGpgKey: pgp.Key; userGpgKey: pgp.SerializedKeyPair<string> }>} - the BitGo and user GPG keys
   */
  private async getBitgoAndUserGpgKeys(
    bitgoPublicGpgKey: string,
    encryptedUserGpgPrvKey: string,
    walletPassphrase: string
  ): Promise<{
    bitgoGpgKey: pgp.Key;
    userGpgKey: pgp.SerializedKeyPair<string>;
  }> {
    const bitgoGpgKey = await pgp.readKey({ armoredKey: bitgoPublicGpgKey });
    const userDecryptedKey = await pgp.readKey({
      armoredKey: this.bitgo.decrypt({ input: encryptedUserGpgPrvKey, password: walletPassphrase }),
    });
    const userGpgKey: pgp.SerializedKeyPair<string> = {
      privateKey: userDecryptedKey.armor(),
      publicKey: userDecryptedKey.toPublic().armor(),
    };
    return {
      bitgoGpgKey,
      userGpgKey,
    };
  }

  /**
   * Validates the adata and cyphertext.
   * @param adata string
   * @param cyphertext string
   * @returns void
   * @throws {Error} if the adata or cyphertext is invalid
   */
  private validateAdata(adata: string, cyphertext: string): void {
    let cypherJson;
    try {
      cypherJson = JSON.parse(cyphertext);
    } catch (e) {
      throw new Error('Failed to parse cyphertext to JSON, got: ' + cyphertext);
    }
    if (cypherJson.adata !== adata) {
      throw new Error('Adata does not match cyphertext adata');
    }
  }

  // #endregion

  // #region external signer
  /** @inheritdoc */
  async signEcdsaMPCv2TssUsingExternalSigner(
    params: TSSParams | TSSParamsForMessage,
    externalSignerMPCv2SigningRound1Generator: CustomMPCv2SigningRound1GeneratingFunction,
    externalSignerMPCv2SigningRound2Generator: CustomMPCv2SigningRound2GeneratingFunction,
    externalSignerMPCv2SigningRound3Generator: CustomMPCv2SigningRound3GeneratingFunction,
    requestType: RequestType = RequestType.tx
  ): Promise<TxRequest> {
    const { txRequest, reqId } = params;
    let txRequestResolved: TxRequest;

    // TODO(WP-2176): Add support for message signing
    assert(
      requestType === RequestType.tx,
      'Only transaction signing is supported for external signer, got: ' + requestType
    );

    if (typeof txRequest === 'string') {
      txRequestResolved = await getTxRequest(this.bitgo, this.wallet.id(), txRequest, reqId);
    } else {
      txRequestResolved = txRequest;
    }

    const bitgoPublicGpgKey =
      (await this.getBitgoGpgPubkeyBasedOnFeatureFlags(txRequestResolved.enterpriseId, true, reqId)) ??
      this.bitgoMPCv2PublicGpgKey;
    if (!bitgoPublicGpgKey) {
      throw new Error('Missing BitGo GPG key for MPCv2');
    }

    // round 1
    const { signatureShareRound1, userGpgPubKey, encryptedRound1Session, encryptedUserGpgPrvKey } =
      await externalSignerMPCv2SigningRound1Generator({ txRequest: txRequestResolved });
    const round1TxRequest = await sendSignatureShareV2(
      this.bitgo,
      txRequestResolved.walletId,
      txRequestResolved.txRequestId,
      [signatureShareRound1],
      requestType,
      this.baseCoin.getMPCAlgorithm(),
      userGpgPubKey,
      undefined,
      this.wallet.multisigTypeVersion(),
      reqId
    );

    // round 2
    const { signatureShareRound2, encryptedRound2Session } = await externalSignerMPCv2SigningRound2Generator({
      txRequest: round1TxRequest,
      encryptedRound1Session,
      encryptedUserGpgPrvKey,
      bitgoPublicGpgKey: bitgoPublicGpgKey.armor(),
    });
    const round2TxRequest = await sendSignatureShareV2(
      this.bitgo,
      txRequestResolved.walletId,
      txRequestResolved.txRequestId,
      [signatureShareRound2],
      requestType,
      this.baseCoin.getMPCAlgorithm(),
      userGpgPubKey,
      undefined,
      this.wallet.multisigTypeVersion(),
      reqId
    );
    assert(
      round2TxRequest.transactions && round2TxRequest.transactions[0].signatureShares,
      'Missing signature shares in round 2 txRequest'
    );

    // round 3
    const { signatureShareRound3 } = await externalSignerMPCv2SigningRound3Generator({
      txRequest: round2TxRequest,
      encryptedRound2Session,
      encryptedUserGpgPrvKey,
      bitgoPublicGpgKey: bitgoPublicGpgKey.armor(),
    });
    await sendSignatureShareV2(
      this.bitgo,
      txRequestResolved.walletId,
      txRequestResolved.txRequestId,
      [signatureShareRound3],
      requestType,
      this.baseCoin.getMPCAlgorithm(),
      userGpgPubKey,
      undefined,
      this.wallet.multisigTypeVersion(),
      reqId
    );

    return sendTxRequest(this.bitgo, txRequestResolved.walletId, txRequestResolved.txRequestId, requestType, reqId);
  }

  async createOfflineRound1Share(params: { txRequest: TxRequest; prv: string; walletPassphrase: string }): Promise<{
    signatureShareRound1: SignatureShareRecord;
    userGpgPubKey: string;
    encryptedRound1Session: string;
    encryptedUserGpgPrvKey: string;
  }> {
    const { prv, walletPassphrase, txRequest } = params;
    const { hashBuffer, derivationPath } = this.getHashStringAndDerivationPath(txRequest);
    const adata = hashBuffer.toString('hex');

    const userKeyShare = Buffer.from(prv, 'base64');
    const userGpgKey = await generateGPGKeyPair('secp256k1');

    const userSigner = new DklsDsg.Dsg(userKeyShare, 0, derivationPath, hashBuffer);
    const userSignerBroadcastMsg1 = await userSigner.init();
    const signatureShareRound1 = await getSignatureShareRoundOne(userSignerBroadcastMsg1, userGpgKey);
    const session = userSigner.getSession();
    const encryptedRound1Session = this.bitgo.encrypt({ input: session, password: walletPassphrase, adata });

    const userGpgPubKey = userGpgKey.publicKey;
    const encryptedUserGpgPrvKey = this.bitgo.encrypt({
      input: userGpgKey.privateKey,
      password: walletPassphrase,
      adata,
    });

    return { signatureShareRound1, userGpgPubKey, encryptedRound1Session, encryptedUserGpgPrvKey };
  }

  async createOfflineRound2Share(params: {
    txRequest: TxRequest;
    prv: string;
    walletPassphrase: string;
    bitgoPublicGpgKey: string;
    encryptedUserGpgPrvKey: string;
    encryptedRound1Session: string;
  }): Promise<{
    signatureShareRound2: SignatureShareRecord;
    encryptedRound2Session: string;
  }> {
    const { prv, walletPassphrase, encryptedUserGpgPrvKey, encryptedRound1Session, bitgoPublicGpgKey, txRequest } =
      params;

    const { hashBuffer, derivationPath } = this.getHashStringAndDerivationPath(txRequest);
    const adata = hashBuffer.toString('hex');
    const { bitgoGpgKey, userGpgKey } = await this.getBitgoAndUserGpgKeys(
      bitgoPublicGpgKey,
      encryptedUserGpgPrvKey,
      walletPassphrase
    );

    const signatureShares = txRequest.transactions?.[0].signatureShares;
    assert(signatureShares, 'Missing signature shares in round 1 txRequest');
    const parsedBitGoToUserSigShareRoundOne = JSON.parse(
      signatureShares[signatureShares.length - 1].share
    ) as MPCv2SignatureShareRound1Output;
    if (parsedBitGoToUserSigShareRoundOne.type !== 'round1Output') {
      throw new Error('Unexpected signature share response. Unable to parse data.');
    }
    const serializedBitGoToUserMessagesRound1 = await verifyBitGoMessagesAndSignaturesRoundOne(
      parsedBitGoToUserSigShareRoundOne,
      userGpgKey,
      bitgoGpgKey
    );

    const round1Session = this.bitgo.decrypt({ input: encryptedRound1Session, password: walletPassphrase });

    this.validateAdata(adata, encryptedRound1Session);
    const userKeyShare = Buffer.from(prv, 'base64');
    const userSigner = new DklsDsg.Dsg(userKeyShare, 0, derivationPath, hashBuffer);
    userSigner.setSession(round1Session);

    const deserializedMessages = DklsTypes.deserializeMessages(serializedBitGoToUserMessagesRound1);
    const userToBitGoMessagesRound2 = userSigner.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: deserializedMessages.broadcastMessages,
    });
    const userToBitGoMessagesRound3 = userSigner.handleIncomingMessages({
      p2pMessages: deserializedMessages.p2pMessages,
      broadcastMessages: [],
    });
    const signatureShareRound2 = await getSignatureShareRoundTwo(
      userToBitGoMessagesRound2,
      userToBitGoMessagesRound3,
      userGpgKey,
      bitgoGpgKey
    );
    const session = userSigner.getSession();
    const encryptedRound2Session = this.bitgo.encrypt({ input: session, password: walletPassphrase, adata });

    return {
      signatureShareRound2,
      encryptedRound2Session,
    };
  }

  async createOfflineRound3Share(params: {
    txRequest: TxRequest;
    prv: string;
    walletPassphrase: string;
    bitgoPublicGpgKey: string;
    encryptedUserGpgPrvKey: string;
    encryptedRound2Session: string;
  }): Promise<{
    signatureShareRound3: SignatureShareRecord;
  }> {
    const { prv, walletPassphrase, encryptedUserGpgPrvKey, encryptedRound2Session, bitgoPublicGpgKey, txRequest } =
      params;

    assert(txRequest.transactions && txRequest.transactions.length === 1, 'Unable to find transactions in txRequest');
    const { hashBuffer, derivationPath } = this.getHashStringAndDerivationPath(txRequest);
    const adata = hashBuffer.toString('hex');

    const { bitgoGpgKey, userGpgKey } = await this.getBitgoAndUserGpgKeys(
      bitgoPublicGpgKey,
      encryptedUserGpgPrvKey,
      walletPassphrase
    );

    const signatureShares = txRequest.transactions?.[0].signatureShares;
    assert(signatureShares, 'Missing signature shares in round 2 txRequest');
    const parsedBitGoToUserSigShareRoundTwo = JSON.parse(
      signatureShares[signatureShares.length - 1].share
    ) as MPCv2SignatureShareRound2Output;
    if (parsedBitGoToUserSigShareRoundTwo.type !== 'round2Output') {
      throw new Error('Unexpected signature share response. Unable to parse data.');
    }
    const serializedBitGoToUserMessagesRound3 = await verifyBitGoMessagesAndSignaturesRoundTwo(
      parsedBitGoToUserSigShareRoundTwo,
      userGpgKey,
      bitgoGpgKey
    );

    const deserializedBitGoToUserMessagesRound3 = DklsTypes.deserializeMessages({
      p2pMessages: serializedBitGoToUserMessagesRound3.p2pMessages,
      broadcastMessages: [],
    });

    const round2Session = this.bitgo.decrypt({ input: encryptedRound2Session, password: walletPassphrase });
    this.validateAdata(adata, encryptedRound2Session);
    const userKeyShare = Buffer.from(prv, 'base64');
    const userSigner = new DklsDsg.Dsg(userKeyShare, 0, derivationPath, hashBuffer);
    userSigner.setSession(round2Session);

    const userToBitGoMessagesRound4 = userSigner.handleIncomingMessages({
      p2pMessages: deserializedBitGoToUserMessagesRound3.p2pMessages,
      broadcastMessages: [],
    });

    const signatureShareRound3 = await getSignatureShareRoundThree(userToBitGoMessagesRound4, userGpgKey, bitgoGpgKey);

    return { signatureShareRound3 };
  }
  // #endregion
}
