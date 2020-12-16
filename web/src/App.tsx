import React from 'react';
import './App.less';
import MainLayout from "./pages/layouts/MainLayout/MainLayout";

import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Dashboard from "./pages/views/Dashboard/Dashboard";
import GuestLayout from "./pages/layouts/GuestLayout/GuestLayout";
import AppRoute from "./pages/components/AppRoute/AppRoute";
import Login from "./pages/views/Login/Login";

const history = createBrowserHistory();
function App() {
  return (
    <div className="App">
        <Router history={history}>
            <Switch>
                <AppRoute path='/login' layout={GuestLayout} component={Login} />
                <AppRoute path='/' layout={MainLayout} restricted={true} component={Dashboard}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
