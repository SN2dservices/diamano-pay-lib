import { PaymentServiceTypeEnum } from './enum';

export interface AuthBody {
  client_id: string;
  client_secret: string;
  grant_type: 'client_credentials';
}
export interface TokenResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
}

export class QrCodePaymentRequestBody {
  amount: number;
  extraData?: any;
  webhook?: string;
  callbackSuccessUrl: string;
  callbackCancelUrl: string;
  description: string;
  feeOnCustomer?: boolean;
}
export class CardPaymentRequestBody extends QrCodePaymentRequestBody {}
export class OrangeMoneyQrCodeResponseDto {
  qrCode: string;
  mobileIntent: string;
  reference: string;
}
export class WaveQrCodeResponseDto {
  wavePaymentPageUrl: string;
  reference: string;
}
export class StripeResponseDto {
  clientSecret: string;
  publicKey: string;
  reference: string;
}

export class OneStepPaymentRequestBodyDto {
  amount: number;
  reference?: any;
  customerId: string;
  otp: string;
  description: string;
  feeOnCustomer?: boolean;
}
export class OneStepPaymentResponseDto {
  transactionId?: string;
  amount: number;
  reference?: any;
  customerId: string;
  status: 'SUCCESS' | 'FAILED';
  message: string;
}

export class PaymentTokenBody {
  amount: number;
  extraData?: any;
  webhook?: string;
  callbackSuccessUrl: string;
  callbackCancelUrl: string;
  paymentMethods?: PaymentServiceTypeEnum[];
  description: string;
  feeOnCustomer?: boolean;
}
export class PaymentTokenResponse {
  token: string;
  expiredAt: string;
  paymentUrl: string;
}

export interface CreatePayoutDto {
  amount: number;
  mobile: string;
  provider: PayoutProvider;
  name?: string;
  description?: string;
  clientReference?: string;
}

export interface PayoutResponseDto {
  success: boolean;
  message: string;
  transactionId: string;
  providerTransactionId: string;
}

export interface FeesCalculationRequestParams {
  amount: number;
  feeOnCustomer?: boolean;
}

export interface FeesCalculationResponse {
  baseAmount: number;
  platformFee: number;
  amountToChargeCustomer: number;
  netAmountReceivedByMerchant: number;
}
export type PayoutProvider = 'WAVE' | 'ORANGE_MONEY';
export type BatchStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'PARTIALLY_COMPLETED'
  | 'FAILED';
export type PayoutStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface BatchPayoutItem {
  amount: number;
  mobile: string;
  provider: PayoutProvider;
  name?: string;
  clientReference?: string;
}

export interface CreateBatchPayoutDto {
  description?: string;
  callbackUrl?: string;
  payouts: BatchPayoutItem[];
}

export interface BatchCreationResponseItem {
  provider: PayoutProvider;
  batchId: string;
  providerBatchId: string;
}

export interface PayoutStatusInBatch {
  clientReference?: string;
  amount: number;
  mobile: string;
  name?: string;
  provider: PayoutProvider;
  status: PayoutStatus;
  providerTransactionId?: string;
  errorMessage?: string | null;
  updatedAt: string;
}

export interface BatchPayoutStatusDto {
  batchId: string;
  status: BatchStatus;
  provider: PayoutProvider;
  description?: string;
  createdAt: string;
  updatedAt: string;
  payouts: PayoutStatusInBatch[];
}
