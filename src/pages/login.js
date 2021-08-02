import React, { Component } from 'react';
import { Form, Input, Button,Checkbox,Card} from 'antd';
import { BrowserRouter as Router, Route,NavLink,Redirect,Link} from "react-router-dom";
import './login.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends Component{
    onSubmit = (values) => {
        console.log('Success:', values);
        if(values.username==="s"){//若校验通过
            localStorage.setItem("token","user")
            localStorage.setItem("username","s")
            this.props.history.replace("/")
        }
        else{
            alert("用户名或密码错误")
        }
    };
    render(){
        return(
            <React.Fragment>
                <div id="login-page">
                <Card title="登录" bordered={false} style={{ width: 300 }}>
                <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onSubmit}>
                    <Form.Item>
                        <p id="login-header">工单系统</p>
                    </Form.Item>
                    <Form.Item name="username" 
                               rules={[{ required: true, message: "请输入用户名" }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item name="password" 
                               rules={[{ required: true, message: '请输入密码!' }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />}
                               type="password" placeholder="密码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        <Form.Item>
                            <a href="/signup">注册新用户</a>
                        </Form.Item>
                    </Form.Item>
                </Form>
                </Card>
                </div>
            </React.Fragment>
            
        )
    }
}
export default Login;
