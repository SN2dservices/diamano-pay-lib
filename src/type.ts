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
}
export class PaymentTokenResponse {
  token: string;
  expiredAt: string;
  paymentUrl: string;
}
