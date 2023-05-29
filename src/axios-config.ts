import axios, {
  Axios,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { PRODUCTION_BASE_URL, SANDBOX_BASE_URL } from './constants';
import { TokenResponse } from './type';

interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

const globalConfig: RetryConfig = {
  retry: 3,
  retryDelay: 1000,
};
export class AxiosConfig {
  customAxios: Axios;
  token: TokenResponse;
  TOKEN_PATH = 'oauth/token';
  private constructor(
    private clientSecret: string,
    private clientId: string,
    production: boolean,
  ) {
    this.customAxios = axios.create({
      baseURL: production ? PRODUCTION_BASE_URL : SANDBOX_BASE_URL,
      headers: {
        'Accept-Encoding': 'identity',
      },
      ...globalConfig,
    });
  }
  static async init(
    clientSecret: string,
    clientId: string,
    production: boolean,
  ) {
    const config = new AxiosConfig(clientSecret, clientId, production);
    config.requestInterceptor();
    config.responseInterceptor();
    await config.getToken();
    return config;
  }

  requestInterceptor() {
    this.customAxios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        if (config.url && !config.url.includes(this.TOKEN_PATH)) {
          config.headers['Authorization'] = `Bearer ${
            this.token ? this.token.accessToken : ''
          }`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error?.response?.data);
      },
    );
  }

  responseInterceptor() {
    this.customAxios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const config: RetryConfig = error.config as RetryConfig;
        if (!config || !config.retry) {
          return Promise.reject(error?.response?.data);
        }
        config.retry -= 1;
        const delayRetryRequest = new Promise<void>((resolve) => {
          setTimeout(async () => {
            if (error.response.status === 401) {
              await this.getToken();
            }
            resolve();
          }, config.retryDelay || 1000);
        });
        return delayRetryRequest.then(() => axios(config));
      },
    );
  }

  async getToken() {
    try {
      const params = new URLSearchParams();
      params.append('client_id', this.clientId);
      params.append('client_secret', this.clientSecret);
      params.append('grant_type', 'client_credentials');

      const result = await this.customAxios.post<TokenResponse>(
        this.TOKEN_PATH,
        params,
      );
      this.token = result.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
  getAxios() {
    return this.customAxios;
  }
}
