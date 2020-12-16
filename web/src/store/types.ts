import {Action} from "redux";

export interface StoreAction<P = null> extends Action {
    payload?: P;
}