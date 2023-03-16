import * as assert from 'assert';

import {
  getInternalChainCode,
  ProprietaryKeySubtype,
  PSBT_PROPRIETARY_IDENTIFIER,
  scriptTypeForChain,
} from '../../../src/bitgo';

import { getDefaultWalletKeys } from '../../../src/testutil';
import {
  createTapInternalKey,
  createTapOutputKey,
  decodePsbtMusig2ParticipantsKeyValData,
} from '../../../src/bitgo/Musig2';
import { scriptTypes2Of3, toXOnlyPublicKey } from '../../../src/bitgo/outputScripts';
import {
  constructPsbt,
  getUnspents,
  validateNoncesKeyVals,
  validateParticipantsKeyVals,
  validatePsbtP2trMusig2Input,
  validatePsbtP2trMusig2Output,
  dummyTapInputKey,
  dummyTapOutputKey,
} from './Musig2Util';

const rootWalletKeys = getDefaultWalletKeys();
const p2trMusig2Unspent = getUnspents(['p2trMusig2'], rootWalletKeys);
const outputType = 'p2trMusig2';
const CHANGE_INDEX = 100;

describe('p2trMusig2', function () {
  describe('p2trMusig2 key path', function () {
    it(`create psbt, nonces, sign (internal verify) - success`, function () {
      const unspents = getUnspents(
        scriptTypes2Of3.map((t) => t),
        rootWalletKeys
      );
      const psbt = constructPsbt(unspents, rootWalletKeys, 'user', 'bitgo', outputType);

      psbt.setMusig2Nonces(rootWalletKeys.user);
      psbt.setMusig2Nonces(rootWalletKeys.bitgo, Buffer.allocUnsafe(32));

      unspents.forEach((unspent, index) => {
        if (scriptTypeForChain(unspent.chain) !== 'p2trMusig2') {
          assert.strictEqual(psbt.getProprietaryKeyVals(index).length, 0);
          return;
        }
        validatePsbtP2trMusig2Input(psbt, index, unspent, 'keyPath');
        validatePsbtP2trMusig2Output(psbt, 0);
        validateParticipantsKeyVals(psbt, index, unspent);
        validateNoncesKeyVals(psbt, index, unspent);
      });
    });

    describe('create nonce', function () {
      it(`update with new nonce should be allowed`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');

        psbt.setMusig2Nonces(rootWalletKeys.user);

        let noncesKeyVals = psbt.getProprietaryKeyVals(0, {
          identifier: PSBT_PROPRIETARY_IDENTIFIER,
          subtype: ProprietaryKeySubtype.MUSIG2_PUB_NONCE,
        });
        assert.strictEqual(noncesKeyVals.length, 1);
        const userNonceKey = noncesKeyVals[0].key.keydata;
        const userNonceValue = noncesKeyVals[0].value;

        psbt.setMusig2Nonces(rootWalletKeys.bitgo);
        psbt.setMusig2Nonces(rootWalletKeys.user);

        noncesKeyVals = psbt.getProprietaryKeyVals(0, {
          identifier: PSBT_PROPRIETARY_IDENTIFIER,
          subtype: ProprietaryKeySubtype.MUSIG2_PUB_NONCE,
        });
        assert.strictEqual(noncesKeyVals.length, 2);

        noncesKeyVals = noncesKeyVals.filter((kv) => kv.key.keydata.equals(userNonceKey));
        assert.strictEqual(noncesKeyVals.length, 1);
        assert.ok(!noncesKeyVals[0].value.equals(userNonceValue));
      });

      it(`skipped if tapInternalKey doesn't match participant pub keys agg`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        psbt.data.inputs[0].tapInternalKey = dummyTapInputKey;
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === 'tapInternalKey and aggregated participant pub keys does not match'
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if sessionId size is invalid`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user, Buffer.allocUnsafe(33)),
          (e) => e.message === 'Invalid sessionId size 33'
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if private key is missing`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user.neutered()),
          (e) => e.message === 'private key is required to generate nonce'
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if tapBip32Derivation is missing`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        psbt.data.inputs[0].tapBip32Derivation = [];
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === 'tapBip32Derivation is required to create nonce'
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if participant pub keys is missing`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        psbt.data.inputs[0].unknownKeyVals = [];
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === 'Found 0 matching participant key value instead of 1'
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 0);
      });

      it(`fails if participant pub keys keydata size is invalid`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const keyVals = psbt.getProprietaryKeyVals(0);
        keyVals[0].key.keydata = Buffer.concat([keyVals[0].key.keydata, Buffer.from('dummy')]);
        psbt.data.inputs[0].unknownKeyVals = [];
        psbt.addProprietaryKeyValToInput(0, keyVals[0]);
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === `Invalid keydata size ${keyVals[0].key.keydata.length} for participant pub keys`
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if participant keydata tapOutputKey in invalid`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const keyVals = psbt.getProprietaryKeyVals(0);
        keyVals[0].key.keydata = Buffer.concat([dummyTapOutputKey, keyVals[0].key.keydata.subarray(32)]);
        psbt.data.inputs[0].unknownKeyVals = [];
        psbt.addProprietaryKeyValToInput(0, keyVals[0]);
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === `Invalid participants keydata tapOutputKey`
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if participant keydata tapInternalKey in invalid`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const keyVals = psbt.getProprietaryKeyVals(0);
        keyVals[0].key.keydata = Buffer.concat([keyVals[0].key.keydata.subarray(0, 32), dummyTapInputKey]);
        psbt.data.inputs[0].unknownKeyVals = [];
        psbt.addProprietaryKeyValToInput(0, keyVals[0]);
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === `Invalid participants keydata tapInternalKey`
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if tapInternalKey and aggregated participant pub keys don't match`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const keyVals = psbt.getProprietaryKeyVals(0);

        const walletKeys = rootWalletKeys.deriveForChainAndIndex(getInternalChainCode('p2trMusig2'), 1);
        const tapInternalKey = createTapInternalKey([walletKeys.user.publicKey, walletKeys.bitgo.publicKey]);
        const tapOutputKey = createTapOutputKey(tapInternalKey, psbt.data.inputs[0].tapMerkleRoot!);

        keyVals[0].key.keydata = Buffer.concat([tapOutputKey, tapInternalKey]);
        keyVals[0].value = Buffer.concat([walletKeys.user.publicKey, walletKeys.bitgo.publicKey]);

        psbt.data.inputs[0].unknownKeyVals = [];
        psbt.addProprietaryKeyValToInput(0, keyVals[0]);
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === `tapInternalKey and aggregated participant pub keys does not match`
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if keydata size of participant pub keys is invalid`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const keyVals = psbt.getProprietaryKeyVals(0);
        keyVals[0].key.keydata = Buffer.allocUnsafe(65);
        psbt.data.inputs[0].unknownKeyVals = [];
        psbt.addProprietaryKeyValToInput(0, keyVals[0]);
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === `Invalid keydata size 65 for participant pub keys`
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if valuedata size of participant pub keys is invalid`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const keyVals = psbt.getProprietaryKeyVals(0);
        keyVals[0].value = Buffer.allocUnsafe(67);
        psbt.data.inputs[0].unknownKeyVals = [];
        psbt.addProprietaryKeyValToInput(0, keyVals[0]);
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === `Invalid valuedata size 67 for participant pub keys`
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if duplicate participant pub keys found`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const keyVals = psbt.getProprietaryKeyVals(0);
        keyVals[0].value = Buffer.concat([keyVals[0].value.subarray(33), keyVals[0].value.subarray(33)]);
        psbt.data.inputs[0].unknownKeyVals = [];
        psbt.addProprietaryKeyValToInput(0, keyVals[0]);
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === `Duplicate participant pub keys found`
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if no fingerprint match`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        psbt.data.inputs[0].tapBip32Derivation?.forEach((bv) => (bv.masterFingerprint = Buffer.allocUnsafe(4)));
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === 'Need one tapBip32Derivation masterFingerprint to match the rootWalletKey fingerprint'
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if pubkey did not match tapBip32Derivation`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const walletKeys = rootWalletKeys.deriveForChainAndIndex(getInternalChainCode('p2trMusig2'), CHANGE_INDEX);
        psbt.data.inputs[0].tapBip32Derivation?.forEach((bv) => {
          bv.path = walletKeys.paths[2];
        });
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === 'pubkey did not match tapBip32Derivation'
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if root wallet key derive more than one tapBip32Derivation`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const walletKeys = rootWalletKeys.deriveForChainAndIndex(
          p2trMusig2Unspent[0].chain,
          p2trMusig2Unspent[0].index
        );
        psbt.data.inputs[0].tapBip32Derivation?.forEach((bv, index) => {
          bv.path = walletKeys.paths[0];
          bv.pubkey = toXOnlyPublicKey(walletKeys.publicKeys[0]);
          bv.masterFingerprint = rootWalletKeys.user.fingerprint;
        });
        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === 'root wallet key should derive one tapBip32Derivation'
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });

      it(`fails if derived wallet key does not match any participant key`, function () {
        const psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'bitgo', 'p2sh');
        const keyVals = psbt.getProprietaryKeyVals(0);

        const walletKeys = rootWalletKeys.deriveForChainAndIndex(getInternalChainCode('p2trMusig2'), 1);
        const tapInternalKey = createTapInternalKey([walletKeys.user.publicKey, walletKeys.bitgo.publicKey]);
        psbt.data.inputs[0].tapInternalKey = tapInternalKey;

        keyVals[0].value = Buffer.concat([walletKeys.user.publicKey, walletKeys.bitgo.publicKey]);
        const tapOutputKey = createTapOutputKey(tapInternalKey, psbt.data.inputs[0].tapMerkleRoot!);
        keyVals[0].key.keydata = Buffer.concat([tapOutputKey, tapInternalKey]);
        psbt.data.inputs[0].unknownKeyVals = [];
        psbt.addProprietaryKeyValToInput(0, keyVals[0]);

        assert.throws(
          () => psbt.setMusig2Nonces(rootWalletKeys.user),
          (e) => e.message === `participant plain pub key should match one tapBip32Derivation plain pub key`
        );
        assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 1);
      });
    });
  });

  describe('p2trMusig2 script path', function () {
    it(`psbt creation success and musig2 skips`, function () {
      let psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'user', 'backup', outputType);
      psbt.setMusig2Nonces(rootWalletKeys.user);
      psbt.setMusig2Nonces(rootWalletKeys.backup);
      assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 0);

      psbt.signAllInputsHD(rootWalletKeys.user);
      psbt.signAllInputsHD(rootWalletKeys.backup);

      assert.ok(psbt.validateSignaturesOfAllInputs());

      validatePsbtP2trMusig2Input(psbt, 0, p2trMusig2Unspent[0], 'scriptPath');
      validatePsbtP2trMusig2Output(psbt, 0);

      psbt = constructPsbt(p2trMusig2Unspent, rootWalletKeys, 'bitgo', 'backup', outputType);
      psbt.setMusig2Nonces(rootWalletKeys.bitgo);
      psbt.setMusig2Nonces(rootWalletKeys.backup);
      assert.strictEqual(psbt.getProprietaryKeyVals(0).length, 0);
      validatePsbtP2trMusig2Input(psbt, 0, p2trMusig2Unspent[0], 'scriptPath');
      validatePsbtP2trMusig2Output(psbt, 0);
    });
  });

  describe('Psbt musig2 util functions', function () {
    it(`getTaprootHashForSigChecked throws error if used for p2tr* input types`, function () {
      const unspents = getUnspents(
        scriptTypes2Of3.filter((t) => t !== 'p2trMusig2' && t !== 'p2tr'),
        rootWalletKeys
      );
      const psbt = constructPsbt(unspents, rootWalletKeys, 'user', 'bitgo', outputType);
      unspents.forEach((unspent, index) => {
        assert.throws(
          () => psbt.getTaprootHashForSigChecked(index),
          (e) => e.message === `${index} input is not a taproot type to take taproot tx hash`
        );
      });
    });

    it(`decodePsbtMusig2ParticipantsKeyValData fails if invalid subtype or identifier is passed`, function () {
      const kv = {
        key: {
          identifier: 'dummy',
          subtype: 0x05,
          keydata: Buffer.allocUnsafe(1),
        },
        value: Buffer.allocUnsafe(1),
      };

      assert.throws(
        () => decodePsbtMusig2ParticipantsKeyValData(kv),
        (e) =>
          e.message === `Invalid identifier ${kv.key.identifier} or subtype ${kv.key.subtype} for participants pub keys`
      );

      kv.key.identifier = PSBT_PROPRIETARY_IDENTIFIER;
      assert.throws(
        () => decodePsbtMusig2ParticipantsKeyValData(kv),
        (e) =>
          e.message === `Invalid identifier ${kv.key.identifier} or subtype ${kv.key.subtype} for participants pub keys`
      );
    });
  });
});
