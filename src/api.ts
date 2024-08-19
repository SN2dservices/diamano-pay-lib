import { AxiosInstance } from 'axios';
import {
  CardPaymentRequestBody,
  OneStepPaymentRequestBodyDto,
  OneStepPaymentResponseDto,
  OrangeMoneyQrCodeResponseDto,
  QrCodePaymentRequestBody,
  StripeResponseDto,
  WaveQrCodeResponseDto,
} from './type';

export class Api {
  constructor(private _axios: AxiosInstance) {}

  async payByOrangeMoneyOneStep(body: OneStepPaymentRequestBodyDto) {
    try {
      const result = await this._axios.post<OneStepPaymentResponseDto>(
        '/api/payment/byOrangeMoneyOneStep',
        body,
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async payByOrangeMoneyQrCode(body: QrCodePaymentRequestBody) {
    try {
      const result = await this._axios.post<OrangeMoneyQrCodeResponseDto>(
        '/api/payment/byOrangeMoneyQrCode',
        body,
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async payByWaveQrCode(body: QrCodePaymentRequestBody) {
    try {
      const result = await this._axios.post<WaveQrCodeResponseDto>(
        `/api/payment/byWaveQrCode`,
        body,
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async getStripeClientSecret(body: CardPaymentRequestBody) {
    try {
      const result = await this._axios.post<StripeResponseDto>(
        `/api/payment/byCard`,
        body,
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  async refund(transactionId: string) {
    try {
      const result = await this._axios.post<boolean>(
        `/api/payout/refund/${transactionId}`,
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
