import React, { Component } from 'react';
import './frontpage.css'
class Frontpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"XXX",
            jinxingzhong:0,
            xinfankui:1,
            zuijinguanbi:0
        }
    }
    componentDidMount(){
        if(!localStorage.hasOwnProperty("token")){
            this.props.history.replace("/login")
        }
        else{
            this.setState({token:localStorage.getItem('token'),username:localStorage.getItem('username')})
        }
    }
    render() { 
        return (  
        <React.Fragment>
            <div className="index-header">用户{this.state.username}，欢迎使用工单管理系统！</div>
            <div className="section-wrapper">
                <div className="section-block" onClick={()=>this.props.history.push({pathname:"/list",params:{defaultFilterValue:"进行中"}})}>
                    <p className="section-block-caption">进行中</p>
                    <p className="section-block-num">{this.state.jinxingzhong}</p>
                </div>
                <div className="section-block" onClick={()=>this.props.history.push({pathname:"/list",params:{defaultFilterValue:"进行中有反馈"}})}>
                    <p className="section-block-caption">新反馈</p>
                    <p className="section-block-num">{this.state.xinfankui}</p>
                </div>
                <div className="section-block" onClick={()=>this.props.history.push({pathname:"/list",params:{defaultFilterValue:"已关闭"}})}>
                    <p className="section-block-caption">最近关闭</p>
                    <p className="section-block-num">{this.state.zuijinguanbi}</p>
                </div>
            </div>
        </React.Fragment>
        
        );
    }
}

export default Frontpage;