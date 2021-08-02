import React, { Component } from 'react';
import './list.css'
import 'antd/dist/antd.css'
import {MessageOutlined} from '@ant-design/icons';
import { Table, Tag, Space,Button,Input,Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class List extends Component {
    constructor(props) {
        super(props);
        let defaultFilterValue=""
        if(this.props.location.params){
          defaultFilterValue=this.props.location.params.defaultFilterValue
        }
        this.state = {
              defaultFilterValue:defaultFilterValue,
              data:[
                {
                  key: '1',
                  id: '00001111111111',
                  description:"工单123444sssssdddddddddddddddddddddddddsssssssss444444",
                  status: '已关闭',
                  createTime: '2021-06-3222222222222222'
                },
                {
                  key: '2',
                  id: '00002',
                  description:"工单1",
                  status: '进行中',
                  createTime: '2021-06-30'
                },
                {
                  key: '3',
                  id: '00003',
                  description:"工单1",
                  status: '已关闭',
                  createTime: '2021-06-30'
                },
                {
                    key: '4',
                    id: '00004',
                  description:"工单1",
                  status: '进行中有反馈',
                  createTime: '2021-06-30'
                  },
                  {
                  key: '5',
                  id: '00005',
                  description:"工单1",
                  status: '已关闭',
                  createTime: '2021-06-30'
                  },
                  {
                  key: '6',
                  id: '00006',
                  description:"工单1",
                  status: '已关闭',
                  createTime: '2021-06-30'
                  },

              ]
        }
        
    }
    componentDidMount(){
      console.log(this.props)
      if(!localStorage.hasOwnProperty("token")){
        this.props.history.replace("/login")
      }
      else{
        this.setState({token:localStorage.getItem('token')})
      }
      
    }
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8}}>
          <Input ref={node => {this.searchInput = node;}}
                placeholder={"请输入关键字搜索"}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}/>
          <Space>
              <Button type="primary"
                      onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                      icon={<SearchOutlined />}
                      size="small"
                      style={{ width: 90 }}>搜索</Button>
              <Button onClick={() => this.handleReset(clearFilters)} 
                      size="small" style={{ width: 90 }}>重置</Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]?record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()):'',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    onClose(index,record){
      if(record.status==="已关闭"){
        alert("您已经关闭了此工单！")
        return
      }
  }
    render() { 
      const columns=[
        {
          title: '工单号',
          width:'15%',
          align:'center',
          dataIndex: 'id',
          key: 'id',
          ...this.getColumnSearchProps('id'),
        },
        {
          title: '描述',
          width:'30%',
          align:'center',
          dataIndex: 'description',
          key: 'description',
          ...this.getColumnSearchProps('description'),
        },
        {
          title: '创建时间',
          align:'center',
          width:'20%',
          dataIndex: 'createTime',
          key: 'createTime',
          ...this.getColumnSearchProps('createTime'),
        },
        {
          title: '状态',
          width:'35px',
          key: 'status',
          align:'center',
          dataIndex: 'status',
          defaultFilteredValue:[this.state.defaultFilterValue],
          filters:[{
            text: '已关闭',
            value: '已关闭',
            },{
              text:'进行中',
              value:'进行中',
            }],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
          render: status => {
              if(status==="进行中有反馈"){
                return (
                  <React.Fragment>
                    <Tag color={"green"} key={status}>进行中</Tag>
                    <MessageOutlined style={{color:"orange",marginLeft:"4px"}}/>
                  </React.Fragment>
                )
              }
              else{
                return(
                  <React.Fragment>
                    <Tag color={status==="已关闭"?'grey':"green"} key={status}>
                    {status}
                    </Tag>
                    <MessageOutlined style={{opacity:0,marginLeft:"4px"}}/>
                  </React.Fragment>
                )
              }
          }      
        },
        {
          title: '操作',
          align:'center',
          width:'15%',
          key: 'action',
          render: (text, record,index) => {
              if(record.status==="已关闭"){
                return <Space size="middle">
                            <a href={"/detail/"+record.id}>查看详情</a>
                            <a style={{opacity:0,pointerEvents:"none"}}>关闭</a>
                       </Space>
              }
              else{
                return <Space size="middle">
                <a href={"/detail/"+record.id}>查看详情</a>
                <Popconfirm title="确定要关闭这份工单吗?" onConfirm = {() => this.onClose(index,record)}
                            cancelText="取消" okText="确认">
                  <a>关闭</a>
                  </Popconfirm>
              </Space>
              }
          }
        },
      ]
        return (  
        <React.Fragment>
            <div className="list-header">所有工单</div>
            <div className="list-table">
              <Table tableLayout="fixed" columns={columns} dataSource={this.state.data} pagination={{pageSize:5}}/>
            </div>
        </React.Fragment>
        );
    }
}

export default List;