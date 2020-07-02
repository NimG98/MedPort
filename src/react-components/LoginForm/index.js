import React from "react";
import { Link } from "react-router-dom";
import { Row, Card, Form, Input, Button} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import "./styles.css";
import 'antd/dist/antd.css';


class LoginForm extends React.Component {
    
    // constructor(props) {
    //     super(props);
    // }
    
    render() {

        return (
            <Row className="loginForm">
                <Card className="login-card">
                    <Form
                        name="login"
                        className="login-form"
                        onFinish={this.props.onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="username"
                            label="Username:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Username.',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined/>}
                                placeholder="Username" 
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your Password.',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item className="login-form-item">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card className="signup-card">
                    <p>Don't have an account?
                        <Link to="/signup" className="signup-redirect"> Sign up</Link>
                    </p>
                </Card>
            </Row>
        );
    }
}
export default LoginForm;