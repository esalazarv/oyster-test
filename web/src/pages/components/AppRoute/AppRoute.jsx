import React from 'react';
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { AppRouteProps } from "../../../types/AppRouteProps";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import Auth from "../../../helpers/Auth";


function AppRoute(props: AppRouteProps) {
    const { layout: Layout , component: Component, restricted, fallback, ...rest} = props;
    const defaultFallback = '/login';
    const resolve = (props: RouteComponentProps) => {
        if (rest.location.pathname === defaultFallback && Auth.check()) {
            return <Redirect to='/'/>;
        }
        return restricted && !Auth.check() ? <Redirect to={fallback??defaultFallback}/> : <Layout><Component {...props}/></Layout>;
    };
    return <Route render={resolve} {...rest}/>
}
const mapStateToProps = (state: any) => {
    const {auth} = state;
    return {auth};
};
const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppRoute);