import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';

const baseConfig: AxiosRequestConfig = {
  timeout: 5000,
  withCredentials: true,
};

type GetAxiosInstance = (baseURL?: string) => AxiosInstance;

const getAxiosInstance: GetAxiosInstance = (baseURL = '/') => (
  axios.create({
    ...baseConfig,
    baseURL,
  })
);

const baseApiInstance: GetAxiosInstance = (url) => (
  axios.create({
    ...baseConfig,
    baseURL: `https://ya-praktikum.tech/api/v2${url}`,
  })
);

export default getAxiosInstance;
export { AxiosError, baseApiInstance };
