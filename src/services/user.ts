import { AxiosInstance } from 'axios';
import getAxiosInstance from '../utils/axios';

class UserApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('https://ya-praktikum.tech/api/v2');
  }

  changeProfile(data: User): Promise<User> {
    return this.http.put('/user/profile', data);
  }

  changePassword(data: { [key: string]: string }): Promise<{ [key: string]: string }> {
    return this.http.put('/user/password', data);
  }

  changeAvatar(form: FormData): Promise<User> {
    return this.http.put('/user/profile/avatar', form)
      .then((response) => response.data);
  }
}

export default new UserApi();
