import HttpClient from '../http/HttpClient';
import AuthorizationMiddleware from '../http/middleware/AuthorizationMiddleware';

abstract class AbstractService {
  protected client!: HttpClient;
  /**
   * Set here your default middleware
   * @type {{authorization: *, ...}}
   */
  static defaultMiddleware = {
    authorization: AuthorizationMiddleware,
  };


  /**
   * Overwrite this setter for add custom middleware on child classes
   * defined by key value, when key is a unique middleware name and value is a middleware function
   * @returns {{}}
   */
  get middleware() {
    return {};
  }

  constructor() {
    if (this.constructor.name === AbstractService.name) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    this._setHttpClient();
    this._applyMiddleware();
  }

  /**
   * This method merge default and custom middleware for create a single middleware list
   * @returns {unknown[]}
   * @private
   */
  _getMiddleware() {
    return Object.values({
      ...AbstractService.defaultMiddleware,
      ...this.middleware,
    });
  }

  _setHttpClient() {
    this.client = new HttpClient();
  }

  /**
   * Apply middleware
   * @private
   */
  _applyMiddleware() {
    this._getMiddleware().map(middleware => {
      this.client.axios.interceptors.request.use(middleware);
    });
  }
}

export default AbstractService;
