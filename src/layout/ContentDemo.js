import React from 'react';
import { Layout, Breadcrumb, Table, Button } from 'antd';
import { HashRouter, Route, Link } from 'react-router-dom';
import FixedSider from "./FixedSider";
import {POST,GET} from "../common/Request";

const { Content } = Layout;
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <Button type="link">{text}</Button>,
    },
    {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '5',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '6',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '7',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '8',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '9',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '10',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '11',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
    
  ];

export default class ContentDemo extends React.Component{

    render(){
        return(
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                />
            </Content>
        )
    }
}

export const SiderContent = () =><FixedSider><ContentDemo/></FixedSider>;

export class Dashboard extends React.Component{
  render() {
    return <div>Welcome to the dashboard !</div>
  }
}

export class About extends React.Component{
  render() {
    return(
      <HashRouter basename="/about">
        <Link to="/product">Product</Link>
        <Link to="/company">Company</Link>
        <Route path="/product" component={Product} />
        <Route path="/company" component={Company} />
      </HashRouter>
    )
  }
}

export class Company extends React.Component{
  render(){
    return <div> About Company !</div>
  }
}

export class Product extends React.Component{
  state = {
    data:[]
  }
  componentDidMount(){
    let that = this;
    GET("/api/fund",{draw:1,start:1,length:10}).then(function(res){
      console.log(res);
      that.setState({
        data:res.data
      })
    })
  }
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