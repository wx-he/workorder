import React, { Component } from 'react';
import './detail.css'
import { Form, Input, Button} from 'antd';
import { Upload,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import consultantURL from '../images/consultant.jpeg'
import userURL from '../images/user.jpg'
const { TextArea } = Input;
function ActionButton(props) {
    const status = props.status;
    if (status==="已关闭") {
        return (<Button type="primary" disabled>工单已关闭</Button>)
    }
    return (<Button type="primary">关闭此工单</Button>);
  }
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            status:"进行中",
            description:"描述xxxxxxxxxxx",
            chatHistory:[{sender:"用户",time:"2021-07-02 16:36",content:"这是内容",attachment:[{name:"附件1",url:"https://www.baidu.com"}]},
                     {sender:"客服",time:"2021-07-02 16:39",content:"这是客服回复的内容",attachment:[]},
                     {sender:"用户",time:"2021-07-02 16:43",content:"这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容这是用户回复客服回复的内容",attachment:[]},
                     {sender:"用户",time:"2021-07-02 16:43",content:"这是用户回复客服回复的内容",attachment:[{name:"附件1",url:"https://www.baidu.com"},{name:"附件2",url:"https://www.baidu.com"}]}]
          }
    }
    componentDidMount(){
        this.setState({id:this.props.match.params.id})
        if(!localStorage.hasOwnProperty("token")){
            this.props.history.replace("/login")
        }
        else{
            this.setState({token:localStorage.getItem('token')})
        }
         
    }
    onFinish = (values) => {
        console.log('Success:', values);
        message.success("提交回复成功！");
        setTimeout(()=>window.location.reload(),500)
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
    }
    render() { 
        return (  
        <React.Fragment>
            <div className="detail-header">工单详情</div>
            <div className="detail-info detail-container">
                <div><span className="detail-property-name">工单号：</span><span className="detail-property-content">{this.state.id}</span></div>
                <div><span className="detail-property-name">状态：</span><span className="detail-property-content">{this.state.status}</span></div>
                <ActionButton status={this.state.status}></ActionButton>
                </div>
            <div className="detail-description detail-container">
                <span className="detail-property-name">描述：</span>{this.state.description}</div>
            <div className="detail-container detail-property-name">沟通记录：
                <ul >
                    {this.state.chatHistory.map((item,index)=>{
                        return(
                            <li key={index} style={{listStyleType: "none"}}>
                                <div className="detail-history-block">
                                    <div className="detail-history-icon">
                                        <img alt="icon not found" src={item.sender==="客服"?consultantURL:userURL}></img>
                                    </div>
                                    <div className="detail-history-info">
                                        <div className="detail-history-info-header">
                                            <div className="detail-history-sender">{item.sender}</div>
                                            <div className="detail-history-time">{item.time}</div>
                                        </div>
                                        <div className="detail-history-content">{item.content}</div>
                                        <ul>
                                            {item.attachment.map((attachment,attachmentindex)=>{
                                                return(
                                                    <li key={attachmentindex} style={{listStyleType:"none"}}>
                                                        <a href={attachment.url} rel="noreferrer" target="_blank">{attachment.name}</a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        
                                    </div>
                                 </div>
                            </li>
                        
                        )})}
                </ul>
            </div>
            <Form name="basic" labelCol={{span: 2,}} wrapperCol={{span: 16,}} 
                  onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                <Form.Item label="回复" name="content" wrapperCol={{span: 21,}} 
                           rules={[{required: true, message: '请输入回复内容!',},]}>
                    <TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
                </Form.Item>
                <Form.Item name="upload"  valuePropName="fileList"  getValueFromEvent={this.normFile}
                           wrapperCol={{offset:2,span:16}}
                           extra="支持.png、.jpg、.jpeg、.txt、.rar、.doc、.xls、.xlsx、.zip、.7z、.mp4格式，最大不超过50M">
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>上传附件</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2, span: 16, }}>
                    <Button type="primary" htmlType="submit">提交回复</Button>
                </Form.Item>
            </Form>
        </React.Fragment>
        
        );
    }
}

export default Detail;