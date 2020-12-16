import React from 'react';
import './Login.less';
import {Button, Card, Form, Input} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    authenticate,
    requestDone,
    requestFail,
    setAccessToken,
} from '../../../store/auth/actions';

function Login(props: any) {
    console.log(props);
    return (
        <div className="oyster-login-container">
            <div className="oyster-login-logo-wrapper">
                <img src="logo-white.svg" alt="oyster"/>
            </div>
            <Form>
                <Card title="Inicio de sesión" className="oyster-login-card">
                    <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input size="large"
                               prefix={<UserOutlined/>}
                               placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input size="large"
                               type="password"
                               prefix={<LockOutlined/>}
                               placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button
                            block
                            shape="round"
                            size="large"
                            type="primary"
                            htmlType="submit"
                            loading={props.auth.requesting}
                            disabled={props.auth.requesting}
                        >
                            Continuar
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
}
const mapStateToProps = (state: any) => {
    const {auth} = state;
    return {auth};
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            authenticate,
            requestDone,
            requestFail,
            setAccessToken,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);