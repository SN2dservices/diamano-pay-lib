import axios, { Axios } from 'axios';
import { AxiosConfig } from './axios-config';
import { Api } from './api';
import { Page } from './page';

export class DiamanoPayAPI {
  private _axios: Axios;
  private constructor() {}
  static async init(clientSecret: string, clientId: string) {
    const diamanoPayAPI = new DiamanoPayAPI();
    const axiosConfig = await AxiosConfig.init(clientSecret, clientId);
    diamanoPayAPI._axios = axiosConfig.getAxios();
    return diamanoPayAPI;
  }
  static async initWithToken(token: string) {
    const diamanoPayAPI = new DiamanoPayAPI();
    const axiosConfig = await AxiosConfig.initWithToken(token);
    diamanoPayAPI._axios = axiosConfig.getAxios();
    return diamanoPayAPI;
  }
  newApi() {
    return new Api(this._axios);
  }
  newPage() {
    return new Page(this._axios);
  }
}
