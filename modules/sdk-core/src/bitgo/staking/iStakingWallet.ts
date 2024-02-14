import { SignedTransaction } from '../baseCoin';
import { PrebuildTransactionOptions, PrebuildTransactionResult } from '../wallet';

export interface StakingRequest {
  id: string;
  amount: string;
  withdrawalAddress: string;
  clientId?: string;
  requestingUserId: string;
  type: string;
  enterpriseId: string;
  walletId: string;
  walletType: string;
  coin: string;
  status: string;
  statusModifiedDate: string;
  createdDate: string;
  transactions: StakingTransaction[];
}

export interface DelegationRequest {
  amount: string;
  validator: string;
}

/**
 * Represents the options for staking.
 * @typedef {Object} StakeOptions
 * @property {string} [amount] - amount to stake
 * @property {string} [clientId] - clientId
 * @property {string} [validator] - chosen validator
 * @property {string} [duration] - delegation duration: a numeric string, in days or cycles
 * @property {string} [subType] - coin sepcific staking subtype
 * @property {string} [btcRewardAddress] - btc reward address
 * @property {DelegationRequest[]} [delegationRequests] - The delegation requests
 */
export interface StakeOptions {
  amount?: string;
  clientId?: string;
  validator?: string;
  /**
   * delegation duration: a numeric string, in days or cycles
   */
  duration?: string;
  /**
   * coin sepcific staking subtype
   */
  subType?: string;
  /**
   * btc reward address
   */
  btcRewardAddress?: string;
  delegationRequests?: DelegationRequest[];
}

export interface UnstakeOptions {
  amount: string;
  clientId?: string;
  delegationId?: string;
  /**
   * coin sepcific staking subtype
   */
  subType?: string;
}

export interface EthUnstakeOptions {
  clientId?: string;
  delegationIds?: string[];
}

export interface SwitchValidatorOptions {
  amount: string;
  clientId?: string;
  delegationId: string;
  validator: string;
}

export interface ClaimRewardsOptions {
  amount: string;
  clientId?: string;
  delegationId?: string;
}

export interface DelegationOptions {
  delegationStatus?: DelegationStatus;
  delegationIds?: Set<string>;
  page?: number;
  pageSize?: number;
  sortBy?: CREATED_DATE_DESC | CREATED_DATE_ASC;
}

export type CREATED_DATE_DESC = '-createdDate';
export type CREATED_DATE_ASC = 'createdDate';

export enum DelegationStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
}

export interface DelegationResults {
  delegations: Delegation[];
  page: number;
  totalPages: number;
  totalElements: number;
}
export interface Delegation {
  id: string;
  delegationAddress: string;
  withdrawalAddress: string;
  delegated: number;
  coin: string;
  walletId: string;
  status: DelegationStatus;
}

export interface TransactionsReadyToSign {
  allSigningComplete: boolean;
  transactions: StakingTransaction[];
}

export interface StakingTransaction {
  id: string;
  stakingRequestId: string;
  delegationId: string;
  transactionType: string;
  createdDate: string;
  status: string;
  statusModifiedDate: string;
  amount: string;
  pendingApprovalId?: string;
  transferId?: string;
  txRequestId?: string;
  buildParams?: PrebuildTransactionOptions;
  gasPrice?: string;
}

export interface StakingPrebuildTransactionResult {
  transaction: StakingTransaction;
  result: PrebuildTransactionResult;
}

export interface StakingSignedTransaction {
  transaction: StakingTransaction;
  signed: SignedTransaction;
}

export interface StakingSignOptions {
  walletPassphrase: string;
}

export interface IStakingWallet {
  readonly walletId: string;
  readonly coin: string;
  stake(options: StakeOptions): Promise<StakingRequest>;
  unstake(options: UnstakeOptions | EthUnstakeOptions): Promise<StakingRequest>;
  switchValidator(options: SwitchValidatorOptions): Promise<StakingRequest>;
  claimRewards(options: ClaimRewardsOptions): Promise<StakingRequest>;
  getStakingRequest(stakingRequestId: string): Promise<StakingRequest>;
  getTransactionsReadyToSign(stakingRequestId: string): Promise<TransactionsReadyToSign>;
  build(transaction: StakingTransaction): Promise<StakingPrebuildTransactionResult>;
  sign(
    signOptions: StakingSignOptions,
    stakingPrebuildTransaction: StakingPrebuildTransactionResult
  ): Promise<StakingSignedTransaction>;
  send(signedTransaction: StakingSignedTransaction): Promise<StakingTransaction>;
  buildSignAndSend(signOptions: StakingSignOptions, transaction: StakingTransaction);
  cancelStakingRequest(stakingRequestId: string): Promise<StakingRequest>;
}
