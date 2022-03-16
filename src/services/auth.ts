import * as Cookies from 'js-cookie';
import axios, { AxiosInstance } from 'axios';
import { AxiosError, baseApiInstance } from '../utils/axios';

class AuthApi {
  http: AxiosInstance;

  constructor() {
    this.http = baseApiInstance('/auth');
  }

  signIn(data: Record<string, unknown>): Promise<unknown> {
    return this.http.post('/signin', data)
      .then(() => Cookies.set('userAuthorized', 'true', { expires: 30 }))
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
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

  getData() {
    return this.http.get('/user');
  }

  signUp(data: Record<string, unknown>): Promise<unknown> {
    return this.http.post('/signup', data)
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
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

  signOut() {
    return this.http.post('/logout')
      .then(() => Cookies.remove('userAuthorized'));
  }
}

export default new AuthApi();
