import { AxiosInstance } from 'axios';
import getAxiosInstance, { AxiosError, isAxiosError } from '../utils/axios';

class AuthApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('https://ya-praktikum.tech/api/v2/auth');
  }

  signIn(data: Record<string, unknown>): Promise<unknown> {
    return this.http.post('/signin', data)
      .catch((error: Error | AxiosError) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          if (status && status === 401) {
            throw new Error('Login or password mismatch');
          } else {
            throw new Error('Unexpected error');
          }
        } else {
          throw error;
        }
      });
  }

  signUp(data: Record<string, unknown>): Promise<unknown> {
    return this.http.post('/signup', data)
      .catch((error: Error | AxiosError) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          if (status && status === 409) {
            throw new Error('User with such data exists');
          } else {
            throw new Error('Unexpected error');
          }
        } else {
          throw error;
        }
      });
  }
}

export default new AuthApi();
