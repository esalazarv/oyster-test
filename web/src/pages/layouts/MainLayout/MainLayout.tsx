import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {LayoutProps} from "../../../types/LayoutProps";
import './MainLayout.less';
import {SideMenu} from "./components/SideMenu/SideMenu";
import {Navbar} from "./components/NavBar/Navbar";

const { Content, Footer } = Layout;
export default function MainLayout(props: LayoutProps) {
    return (
        <Layout className="oyster-main-layout">
            <Navbar/>
            <Layout>
                <SideMenu/>
                <Layout className="oyster-layout-container">
                    <Content className="oyster-layout-content-wrapper">
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="oyster-layout-content">{props.children}</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Oyster ©2020 | Developed with love</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}