import { Axios } from 'axios';
import { PaymentTokenBody, PaymentTokenResponse } from './type';

export class Page {
  constructor(private _axios: Axios) {}

  async getPaymentToken(body: PaymentTokenBody) {
    try {
      const result = await this._axios.post<PaymentTokenResponse>(
        '/api/payment/paymentToken',
        body,
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
