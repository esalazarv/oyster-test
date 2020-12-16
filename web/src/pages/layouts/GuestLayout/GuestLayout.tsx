import React from 'react';
import { Layout } from 'antd';
import {LayoutProps} from "../../../types/LayoutProps";
import './GuestLayout.less';

const { Header, Content, Footer } = Layout;
function GuestLayout(props: LayoutProps) {
    return (
        <Layout className="oyster-layout oyster-primary-bg">
            <Header className="oyster-primary-bg">
                <div className="logo" />
            </Header>
            <Content>
                <div className="oyster-layout-content oyster-layout-full-height">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Oyster ©2020 | Developed with love</Footer>
        </Layout>
    );
}



export default GuestLayout;
