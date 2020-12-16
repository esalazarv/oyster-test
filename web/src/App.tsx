import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import MainLayout from "./pages/layouts/MainLayout/MainLayout";

import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Dashboard from "./pages/views/Dashboard/Dashboard";
import GuestLayout from "./pages/layouts/GuestLayout/GuestLayout";
import AppRoute from "./pages/components/AppRoute/AppRoute";

const history = createBrowserHistory();
function App() {
  return (
    <div className="App">
        <Router history={history}>
            <Switch>
                <AppRoute path='/login' layout={GuestLayout} component={Dashboard} />
                <AppRoute path='/' layout={MainLayout} restricted={true} component={Dashboard} fallback={null}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
