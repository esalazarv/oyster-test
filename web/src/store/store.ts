import {createStore, combineReducers, Store} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { devToolsEnhancer } from 'redux-devtools-extension';
import AuthReducer from "./auth/reducer";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        auth: AuthReducer,
    }),
);

export const AppStore: Store = createStore(persistedReducer, devToolsEnhancer({

}));
export const Persistor = persistStore(AppStore);
