import AbstractService from './AbstractService';

class AuthService extends AbstractService {
  authenticate(credentials = {}) {
    return this.client
      .post('/auth/login', {...credentials});
  }
}

export default AuthService;
