import React from 'react';
import { Layout, Breadcrumb, Table, message } from 'antd';
import axios from "../../common/axios-global";
import "./Content.css";

const { Content } = Layout;

export class FundManagement extends React.Component{

  state = {
    columns:[
      {
        title: '代码',
        dataIndex: 'tsCode',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '状态',
        dataIndex: 'status'
      }
  ],
    data:[],
    loading:false,
    pagination:{
      showSizeChanger:true,
      showQuickJumper:true,
      pageSizeOptions:['10','20','25','50'],
      current:1,
      page:1,
      pageSize:10,
      total:0,
      showTotal:(total, range) => `显示第 ${range[0]} 至 ${range[1]} 项结果，共 ${total} 项`
    }
  }

  loadData = ({current,pageSize})=>{
    let that = this;
    let start = (current - 1)*pageSize,length = pageSize;
    that.setState({loading:true});
    axios.get("/api/fund",{params:
      {start,length}
    })
    .then(function(res){
      let result = res.data;
      let pagination = {page:current,pageSize,total:result.recordsTotal};
      that.setState({
        loading:false,
        data:result.data,
        pagination
      })
    })
    .catch(function(err){
      that.setState({loading:false});
      message.error(err.toString());
    })
  }

  componentDidMount(){
    this.loadData(this.state.pagination);
  }

  tableChange = (pagination, filters, sorter)=>{
    console.log(pagination);
    this.loadData(pagination);
  }

  render(){
    return(
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Table
                columns={this.state.columns}
                rowKey={record => record.tsCode}
                loading={this.state.loading}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                onChange={this.tableChange}
                bordered
            />
        </Content>
    )
  }
}


export class Dashboard extends React.Component{
  render() {
    return <div>Welcome to the dashboard !</div>
  }
}

export class AboutCompany extends React.Component{
  render(){
    return <div> About Company !</div>
  }
}

export class AboutProduct extends React.Component{
  state = {
    data:[]
  }
  // componentDidMount(){
  //   let that = this;
  //   axios.get("/api/fund",{params:{draw:1,start:1,length:10}})
  //   .then(function(res){
  //     console.log(res);
  //     that.setState({
  //       data:res.data.data
  //     })
  //   })
  //   .catch(function(err){
  //     message.error(err.toString());
  //   })
  // }
  render(){
    return <div> 
      About Product !
      {
        this.state.data.map((item, index) => {
          return <div key={item.tsCode}>{item.name}</div>
        })
      }
    </div>
  }
}