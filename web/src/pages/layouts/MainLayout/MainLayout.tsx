import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {LayoutProps} from "../../../types/LayoutProps";

const { Header, Content, Footer } = Layout;
export default function MainLayout(props: LayoutProps) {
    return (
        <Layout className="site-layout-content">
            <Header className="oyster-primary-bg">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Oyster ©2020 | Developed with love</Footer>
        </Layout>
    );
}