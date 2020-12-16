import React from 'react';
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { AppRouteProps } from "../../../types/AppRouteProps";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";


function AppRoute(props: AppRouteProps) {
    const { layout: Layout , component: Component, restricted, fallback, ...rest} = props;
    const hasToken = !!rest.auth.access_token;
    const resolve = (props: RouteComponentProps) => {
        return restricted && !hasToken ? <Redirect to={fallback??'/login'}/> : <Layout><Component {...props}/></Layout>;
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