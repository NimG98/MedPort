import React from "react";
import { Row, Card, Form, Input, Button} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import "./styles.css";

class LoginForm extends React.Component {
    
    onFinish = values => {
        console.log('Received values of form: ', values);
    };
    
    
    render() {
        return (
            <Row>
                <Card className="login-card">
                    <Form
                        name="login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Username.',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username" 
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Password.',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <a className="login-form-forgot" href="">
                            Forgot password?
                            </a>
                        </Form.Item>
                    </Form>
                </Card>
                <Card className="no-account-signup">
                    <p>Don't have an account?
                        <a className="signup-redirect" href="">Sign up</a>
                    </p>
                </Card>
            </Row>
        );
    }
}