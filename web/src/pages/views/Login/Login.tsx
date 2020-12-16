import React from 'react';
import './Login.less';
import { Button, Card, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {
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
                        <Button block shape="round" size="large" type="primary" htmlType="submit">
                            Continuar
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
}

export default Login;