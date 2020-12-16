import {Menu} from "antd";
import React from "react";
import {Header} from "antd/es/layout/layout";

export function Navbar() {
    return (
        <Header className="oyster-layout-padding-0">
            <div className="oyster-header-logo">
                <img src="logo.svg" alt="oyster"/>
            </div>
            <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">Dashboard</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
    );
}