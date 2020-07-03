import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";
import 'antd/dist/antd.css';
import { Row, Card, Form, Input, Button} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { validateLogin } from "../../actions/app";
import { redirect } from "../../actions/router";

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            displayInvalid: false
        };

        this.login = this.login.bind(this);
        this.displayInvalidCredentials = this.displayInvalidCredentials.bind(this);
    }

    login = loginValues => {
        const username = loginValues.username;
        const password = loginValues.password;
        const isValid = validateLogin(this.props.appComponent, username, password);
    
        if(isValid){
            document.cookie = "LoggedInSession=Valid; " + "path=/";
            redirect(this, '/dashboard');
        } else {
            this.displayInvalidCredentials();
        }
      }

    displayInvalidCredentials() {
        this.setState({ displayInvalid: true });
    }
    
    render() {

        return (
            <Row className="loginForm">
                <Card className="login-card">
                    <Form
                        name="login"
                        className="login-form"
                        onFinish={this.login}
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
                    {this.state.displayInvalid &&
                        <p className="invalidCredMessage">Invalid Credentials</p>
                    }
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
export default withRouter(LoginForm);