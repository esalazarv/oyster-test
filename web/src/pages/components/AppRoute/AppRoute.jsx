import React, {Component} from 'react';
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { AppRouteProps } from "../../../types/AppRouteProps";


function AppRoute(props: AppRouteProps) {
    const { layout: Layout , component: Component, restricted, fallback, ...rest} = props;
    const resolve = (props: RouteComponentProps) => {
        return restricted ? <Redirect to={fallback??'/login'}/> : <Layout><Component {...props}/></Layout>;
    };
    return <Route render={resolve} {...rest}/>
}

export default AppRoute;