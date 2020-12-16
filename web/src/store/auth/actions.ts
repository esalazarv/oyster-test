import {StoreAction} from "../types";
import {Token} from "./types";
export const AUTH_ACTION_TYPES = {
  AUTHENTICATE: '[AUTH] authenticate',
  LOG_OUT: '[AUTH] logout',
  REQUEST_DONE: '[AUTH] request done',
  REQUEST_FAIL: '[AUTH] request fail',
  SET_ACCESS_TOKEN: '[AUTH] set access token',
  INCREMENT_FAIL_COUNTER: '[AUTH] increment try counter',
};

export function authenticate(): StoreAction {
  console.log(AUTH_ACTION_TYPES.AUTHENTICATE);
  return {type: AUTH_ACTION_TYPES.AUTHENTICATE};
}

export function logout(): StoreAction {
  console.log(AUTH_ACTION_TYPES.LOG_OUT);
  return {type: AUTH_ACTION_TYPES.LOG_OUT};
}

export function setAccessToken(payload: Token): StoreAction<Token> {
  console.log(AUTH_ACTION_TYPES.SET_ACCESS_TOKEN);
  return {type: AUTH_ACTION_TYPES.SET_ACCESS_TOKEN, payload};
}

export function requestDone(): StoreAction {
  console.log(AUTH_ACTION_TYPES.REQUEST_DONE);
  return {type: AUTH_ACTION_TYPES.REQUEST_DONE};
}

export function requestFail(payload: Token): StoreAction<Token> {
  console.log(AUTH_ACTION_TYPES.REQUEST_FAIL);
  return {type: AUTH_ACTION_TYPES.REQUEST_FAIL, payload};
}

export function incrementTryCounter() {
  console.log(AUTH_ACTION_TYPES.INCREMENT_FAIL_COUNTER);
  return {type: AUTH_ACTION_TYPES.INCREMENT_FAIL_COUNTER};
}
