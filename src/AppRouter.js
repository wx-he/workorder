import React, { Component} from 'react';
import { Route,NavLink } from "react-router-dom";
import Frontpage from './pages/frontpage'
import List from './pages/list'
import Detail from './pages/detail'
import CreateWorkOrder from './pages/createworkorder'
import './AppRouter.css'
import frontpageURL from './images/frontpage.png'
import listURL from './images/list.png'
import createURL from './images/create.png'
import { Dropdown,Menu,Modal} from 'antd';
import { Form, Input, Button,message} from 'antd';

class AppRouter extends Component {
    constructor(props){
        super(props)
        this.state={
            isModalVisible:false,
            mobileMode:window.screen.width<480?true:false,
            userAvatarDropdown:(
                <Menu>
                  <Menu.Item key="1" onClick={this.openChangePasswordModal}>
                      修改密码
                  </Menu.Item>
                  <Menu.Item key="2" onClick={this.quitLogin.bind(this)}>
                      退出登录
                  </Menu.Item>
                </Menu>
              )
        }
        /**
         * if(window.matchMedia('(max-width:480px)').matches){//移动端
            this.state={mobileMode:true}
        }
        else{
            this.state={mobileMode:false}
        }
         */
        
    }
   closeChangePasswordModal=()=>(this.setState({isModalVisible:false}))
   openChangePasswordModal=()=>(this.setState({isModalVisible:true}))
   changePasswordSubmit(values){
        message.success('修改密码成功');
        this.setState({isModalVisible:false})
   }
   quitLogin(){
        localStorage.removeItem("token");
        this.props.history.replace('/login')
   }
  render(){
    return (
        <div>
        <input type="checkbox" id="sidebar-toggle" name="sidebar-toggle" defaultChecked={!this.state.mobileMode}/>
        <label htmlFor="sidebar-toggle" id="sidebar-toggle-label"></label>
        <header>
            <span>工单系统</span>
            <Dropdown overlay={this.state.userAvatarDropdown} placement="bottomLeft">
                <button id="userAvatar"></button>
            </Dropdown>
            <div id="header-username">{localStorage.getItem('username')}</div>
        </header>
        



        <nav id="sidebar">
            <div className="sidebar-title">
                <span>工单系统</span>
            </div>
            <ul>
                <li><img className="icon"src={frontpageURL} alt=""></img><NavLink exact to="/" activeClassName="sidebar-active">首页</NavLink></li>
                <li><img className="icon"src={listURL} alt=""></img><NavLink to="/list" activeClassName="sidebar-active">工单列表</NavLink></li>
                <li><img className="icon"src={createURL} alt=""></img><NavLink to="/create" activeClassName="sidebar-active">创建工单</NavLink></li>
            </ul>
        </nav>
        <div id="page-content">
            <Route path="/" exact component={Frontpage} />
            <Route path="/list" component={List} />
            <Route path="/create" component={CreateWorkOrder} />
            <Route path="/detail/:id" component={Detail}></Route>
        </div>
        
        






        <Modal title="修改密码" visible={this.state.isModalVisible} footer={null} onCancel={this.closeChangePasswordModal}>
            <Form  name="changePassword" onFinish={this.changePasswordSubmit.bind(this)} scrollToFirstError>
                
                <Form.Item  name="password_old" label="旧密码"
                            rules={[{required: true,message: '请输入旧密码!'}]}
                            hasFeedback>
                    <Input.Password />
                </Form.Item>
                <Form.Item  name="password_new" label="新密码"
                            rules={[{required: true,message: '请输入新密码!'}]}
                            hasFeedback>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="confirm" label="确认新密码" dependencies={['password_new']}
                           hasFeedback rules={[{required: true,message: '请确认新密码！'},
                                                ({ getFieldValue }) => ({validator(_, value) {
                                                    if (!value || getFieldValue('password_new') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('两次输入密码不一致!'));
                                                }})]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
        </Modal>

        </div>
        
      );
  }
  
  
}


export default AppRouter;