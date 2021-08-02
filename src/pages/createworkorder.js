import React, { Component } from 'react';
import './createworkorder.css'
import { Form, Input, Button} from 'antd';
import { Upload,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
const { TextArea } = Input;
class CreateWorkOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {filelist:null  }
    }
    onFinish = (values) => {
        console.log('Success:', values);
        message.success("创建工单成功");
        setTimeout(()=>this.props.history.replace("/detail/00002"),500)
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
    addFile(options){
        console.log(options)
        options.onSuccess("","")
    }
    componentDidMount(){
        if(!localStorage.hasOwnProperty("token")){
          this.props.history.replace("/login")
        }
        else{
          this.setState({token:localStorage.getItem('token')})
        }
      }
    render() { 
        return (  
        <React.Fragment>
            <div className="createworkorder-header">创建工单</div>
            <div className="createworkorder-container">
            <Form name="basic" labelCol={{span: 4,}} wrapperCol={{span: 16,}} 
                  onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                <Form.Item label="描述" name="description"
                           rules={[{required: true, message: '请输入工单描述!',},]}>
                    <TextArea autoSize={{ minRows: 1, maxRows: 3 }}/>
                </Form.Item>
                <Form.Item label="内容" name="content"
                           rules={[{required: true, message: '请输入工单内容!',},]}>
                    <TextArea autoSize={{ minRows: 8, maxRows: 10 }}/>
                </Form.Item>
                <Form.Item name="upload"  valuePropName="fileList"  getValueFromEvent={this.normFile}
                           wrapperCol={{offset:4,span:16}}
                           extra="支持.png、.jpg、.jpeg、.txt、.rar、.doc、.xls、.xlsx、.zip、.7z、.mp4格式，最大不超过50M">
                    <Upload name="logo"  listType="picture" customRequest={this.addFile} progress="none">
                        <Button icon={<UploadOutlined />}>上传附件</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16, }}>
                    <Button type="primary" htmlType="submit">提交工单</Button>
                </Form.Item>
            </Form>
            </div>
           
        </React.Fragment>
        );
    }
}

export default CreateWorkOrder;