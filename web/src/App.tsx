import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import './App.less';
import {AppStore, Persistor} from './store/store';
import MainLayout from "./pages/layouts/MainLayout/MainLayout";
import Dashboard from "./pages/views/Dashboard/Dashboard";
import GuestLayout from "./pages/layouts/GuestLayout/GuestLayout";
import AppRoute from "./pages/components/AppRoute/AppRoute";
import Login from "./pages/views/Login/Login";

const history = createBrowserHistory();
function App() {
  return (
    <div className="App">
        <Provider store={AppStore}>
            <PersistGate loading={null} persistor={Persistor}>
                <Router history={history}>
                    <Switch>
                        <AppRoute path='/login' layout={GuestLayout} component={Login} />
                        <AppRoute path='/' layout={MainLayout} restricted={true} component={Dashboard}/>
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    </div>
  );
}

export default App;
