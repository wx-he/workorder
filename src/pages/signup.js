import React, { Component } from 'react';
import { Form, Input, Button,Checkbox,Card} from 'antd';
import './signup.css'
class Signup extends Component{
    onFinish = (values) => {
        console.log('Success:', values);
        this.props.history.replace("/login")
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render(){
        return(
            <React.Fragment>
                
                <div id="login-page">
                <Card title="注册新用户" bordered={false} style={{ width: 300 }}>
                <Form  name="register" onFinish={this.onFinish} scrollToFirstError>
                <Form.Item name="username" label="用户名"
                            rules={[{ required: true, message: '请输入用户名!', whitespace:true}]}>
                    <Input />
                </Form.Item>
                <Form.Item  name="password" label="密码"
                            rules={[{required: true,message: '请输入密码!'}]}
                            hasFeedback>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="confirm" label="确认密码" dependencies={['password']}
                           hasFeedback rules={[{required: true,message: '请确认密码！'},
                                                ({ getFieldValue }) => ({validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('两次输入密码不一致!'));
                                                }})]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="email" label="邮箱"
                            rules={[{type: 'email', message: '不是有效的邮箱地址!'},
                                    {required: true,message: '请输入邮箱!'}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="company" label="公司名"
                            rules={[{ required: true, message: '请输入公司名!', whitespace:true}]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">注册</Button>
                </Form.Item>
                </Form>
                </Card>
                </div>
            </React.Fragment>
            
        )
    }
}
export default Signup;
