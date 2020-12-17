import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import config from '../config';

class AxiosBuilder {
  /**
   * Default axios configuration
   * @type {AxiosRequestConfig}
   */
  static defaultConfig: AxiosRequestConfig = {
    baseURL: config.api.host,
    timeout: config.api.timeout,
  };

  /**
   * Build a new Instance of axios
   * @returns {AxiosInstance}
   * @param options
   */
  static build(options: AxiosRequestConfig = {}): AxiosInstance {
    return axios.create({...AxiosBuilder.defaultConfig, ...options});
  }
}

export default AxiosBuilder;
