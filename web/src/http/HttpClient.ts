import {AxiosRequestConfig, AxiosInstance} from 'axios';
import AxiosBuilder from './AxiosBuilder';

class HttpClient {
  public axios: AxiosInstance;

  /**
   * @param config {AxiosRequestConfig}
   */
  constructor(config = {}) {
    this.axios = AxiosBuilder.build(config);
  }

  /**
   * Make a GET request
   * @param url
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<any> | never>}
   */
  get(url: string, conf = {}): Promise<any> {
    return this.axios
      .get(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a POST request
   * @param url
   * @param data
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<any> | never>}
   */
  post(url: string, data = {}, conf = {}): Promise<any> {
    return this.axios
      .post(url, data, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a PUT request
   * @param url
   * @param data
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<any> | never>}
   */
  put(url: string, data = {}, conf = {}): Promise<any> {
    return this.axios
      .put(url, data, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a PATCH request
   * @param url
   * @param data
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<any> | never>}
   */
  patch(url: string, data = {}, conf = {}): Promise<any> {
    return this.axios
      .patch(url, data, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a DELETE request
   * @param url
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<any> | never>}
   */
  delete(url: string, conf = {}): Promise<any> {
    return this.axios
      .delete(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a HEAD request
   * @param url
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<any> | never>}
   */
  head(url: string, conf = {}): Promise<any> {
    return this.axios
      .head(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }

  /**
   * Make a OPTIONS request
   * @param url
   * @param conf {AxiosRequestConfig}
   * @returns {Promise<any> | never>}
   */
  options(url: string, conf = {}): Promise<any> {
    return this.axios
      .options(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error.response));
  }
}

export default HttpClient;
