import Auth from '../../helpers/Auth';
import {AppStore} from '../../store/store';

const AuthorizationMiddleware = config => {
  if (Auth.hasToken()) {
    const {auth} = AppStore.getState();
    config.headers.Authorization = `${auth.type} ${auth.token}`;
  }
  return config;
};

export default AuthorizationMiddleware;
