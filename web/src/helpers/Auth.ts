import moment from 'moment';
import {AppStore} from '../store/store';
import {logout} from '../store/auth/actions';

export default class Auth {
    static hasToken() {
        const {auth} = AppStore.getState();
        return !!auth.token;
    }

    static check() {
        return Auth.hasToken() && !Auth.isExpired();
    }

    static willExpireIn(minutes = 10) {
        const {auth} = AppStore.getState();
        try {
            const now = moment();
            const expires = moment(auth.issued_at * 1000);
            const offset = minutes * 60;
            if (now.isBefore(expires.add(auth.expires - offset, 'seconds'))) {
                return false;
            }
        } catch (e) {
            return true;
        }
        return true;
    }

    static isExpired() {
        const {auth} = AppStore.getState();
        try {
            const now = moment();
            const expires = moment(auth.issued_at * 1000);
            if (now.isBefore(expires.add(auth.expires, 'seconds'))) {
                return false;
            }
        } catch (e) {
            return true;
        }
        return true;
    }

    static logout() {
        AppStore.dispatch(logout());
    }
}
