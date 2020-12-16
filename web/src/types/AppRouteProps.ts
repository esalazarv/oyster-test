import {RouteComponentProps, RouteProps} from "react-router-dom";
import React from "react";

export interface AppRouteProps extends RouteProps {
    layout: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    restricted?: boolean,
    fallback?: string | null | undefined,
}