import {Button, Menu} from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import {Header} from "antd/es/layout/layout";
import {PoweroffOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./Navbar.less";
import { logout } from "../../../../../store/auth/actions";

function Navbar(props: any) {
    const isMobile = useMediaQuery({ query: '(max-width: 991px)' });
    return (
        <Header className="oyster-navbar">
            <div className="oyster-header-logo">
                <img src="logo.svg" alt="oyster"/>
            </div>
            <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1" hidden={isMobile}>
                    <NavLink to='/'>Dashboard</NavLink>
                </Menu.Item>
                <Menu.Item key="2" hidden={isMobile}>
                    <NavLink to='/users'>Users</NavLink>
                </Menu.Item>
                <Menu.Item key="3" hidden={isMobile}>
                    <NavLink to='/logs'>Logs</NavLink>
                </Menu.Item>
                <div className="oyster-nav-user-actions">
                    <Button type="primary" shape="circle"  onClick={props.logout} className="oyster-logout-button" icon={<PoweroffOutlined />} size="large" />
                </div>
            </Menu>
        </Header>
    );
}

const mapStateToProps = (state: any) => {};
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    logout,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);