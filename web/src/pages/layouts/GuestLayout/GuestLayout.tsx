import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {LayoutProps} from "../../../types/LayoutProps";

const { Header, Content, Footer } = Layout;
function GuestLayout(props: LayoutProps) {
    return (
        <Layout className="site-layout-content">
            <Header>
                <div className="logo" />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Oyster ©2020 | Developed with love</Footer>
        </Layout>
    );
}



export default GuestLayout;
