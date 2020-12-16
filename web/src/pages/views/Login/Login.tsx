import React, {ChangeEvent, useState} from 'react';
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
import AuthService from "../../../services/AuthService";

function Login(props: any) {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authService = new AuthService();
    const authenticate = () => {
        setError('');
        props.authenticate();
        authService.authenticate({ username, password })
            .then((response) => console.log(response))
            .catch((error) => {
                setError(error.statusText);
                props.requestFail();
            })
            .finally(() => props.requestDone());
    };
    const submit = () => {
        authenticate();
    };
    return (
        <div className="oyster-login-container">
            <div className="oyster-login-logo-wrapper">
                <img src="logo-white.svg" alt="oyster"/>
            </div>
            <Card title="Inicio de sesión" className="oyster-login-card">
                <Form onFinish={submit} initialValues={{username, password}}>
                    <div className="oyster-login-form-message">
                        { !!error ? <small className="oyster-error-message">{error}</small> : null}
                    </div>
                    <Form.Item name="username" rules={[
                        { required: true, message: 'Please input your username!' },
                        { type: 'email', message: 'Username! must be a valid email' }
                        ]}>
                        <Input size="large"
                               prefix={<UserOutlined/>}
                               value={username}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                               placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input size="large"
                               type="password"
                               value={password}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
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
                </Form>
            </Card>
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