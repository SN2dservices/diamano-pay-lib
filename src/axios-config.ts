import axios, {
  Axios,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { PRODUCTION_BASE_URL } from './constants';
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
  private accessToken: string;
  TOKEN_PATH = 'oauth2/token';
  private constructor(private clientSecret: string, private clientId: string) {
    this.customAxios = axios.create({
      baseURL: PRODUCTION_BASE_URL,
      headers: {
        'Accept-Encoding': 'identity',
      },
      ...globalConfig,
    });
  }
  static async init(clientSecret: string, clientId: string) {
    const config = new AxiosConfig(clientSecret, clientId);
    config.requestInterceptor(false);
    config.responseInterceptor(false);
    await config.getToken();
    return config;
  }
  static async initWithToken(token: string) {
    const config = new AxiosConfig(null, null);
    config.requestInterceptor(true);
    config.responseInterceptor(true);
    config.accessToken = token;
    return config;
  }

  requestInterceptor(withAccessToken: boolean) {
    this.customAxios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        if (config.url && !config.url.includes(this.TOKEN_PATH)) {
          config.headers['Authorization'] = `Bearer ${
            withAccessToken
              ? this.accessToken
              : this.token
              ? this.token.accessToken
              : ''
          }`;
        }
        return config;
      },
      (error) => {
        console.log(
          'Error during requesting the server ',
          error?.response?.data,
        );
        Promise.reject(error?.response?.data);
      },
    );
  }

  responseInterceptor(withAccessToken: boolean) {
    this.customAxios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        console.log('Error from server response', error?.response?.data);
        const config: RetryConfig = error.config as RetryConfig;
        if (!config || !config.retry) {
          return Promise.reject(error?.response?.data);
        }
        config.retry -= 1;
        const delayRetryRequest = new Promise<void>((resolve, reject) => {
          setTimeout(async () => {
            if (error.response.status === 401) {
              try {
                if (!withAccessToken) {
                  await this.getToken();
                }
              } catch (error) {
                console.log('An error occur while getting token ', error);
              }
            } else if (
              error.response.status >= 200 &&
              error.response.status < 400
            ) {
              resolve();
            } else {
              reject(error.response.data);
            }
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
      console.log('Error when getting token', error.message);
      throw Error(error.message);
    }
  }
  getAxios() {
    return this.customAxios;
  }
}
