import {Menu} from "antd";
import React from "react";
import { useMediaQuery } from 'react-responsive';
import {Header} from "antd/es/layout/layout";
import "./Navbar.less";

export function Navbar() {
    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
    const mode = isDesktop ? "horizontal": "vertical";
    return (
        <Header className="oyster-navbar">
            <div className="oyster-header-logo">
                <img src="logo.svg" alt="oyster"/>
            </div>
            <Menu mode={mode} defaultSelectedKeys={['2']}>
                <Menu.Item key="1">Dashboard</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
    );
}