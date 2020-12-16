import {AUTH_ACTION_TYPES} from './actions';
import moment from 'moment';
import {StoreAction} from "../types";
import {AuthState, Token} from "./types";

const initialState: AuthState = {
  requesting: true,
  access_token: "null",
  access_type: null,
  issued_at: 0,
  expires: 0,
  failCounter: 0,
};

const AuthReducer = (state: AuthState = initialState, action: StoreAction<Token>): AuthState => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.AUTHENTICATE: {
      return {...state, requesting: true, failCounter: 0};
    }
    case AUTH_ACTION_TYPES.LOG_OUT: {
      return {...initialState};
    }
    case AUTH_ACTION_TYPES.REQUEST_DONE: {
      return {...state, requesting: false};
    }
    case AUTH_ACTION_TYPES.REQUEST_FAIL: {
      return {...state, requesting: false};
    }
    case AUTH_ACTION_TYPES.SET_ACCESS_TOKEN: {
      const issued_at = moment().unix();
      return {...state, requesting: false, ...action.payload, issued_at};
    }
    case AUTH_ACTION_TYPES.INCREMENT_FAIL_COUNTER: {
      return {...state, failCounter: state.failCounter + 1};
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
