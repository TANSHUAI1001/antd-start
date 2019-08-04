import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import logo from "../logo.svg";
import "./FixedSider.css";

const { Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default class FixedSider extends React.Component {
  state = {
    collapsed: false,
    leftMargin: '200px'
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    let newMargin = '200px';
    if(this.state.leftMargin === '200px'){
      newMargin = '80px';
    }
    this.setState({ collapsed,leftMargin:newMargin });
  };

  render() {
    return (
      <Layout style={{minHeight:'100vh'}}>
        <Sider 
        collapsible 
        collapsed={this.state.collapsed} 
        onCollapse={this.onCollapse}
        style={{
          overflowX: 'hidden',
          height: '100vh',
          position: 'fixed'
        }}
        >
          <div className="logo" >
            <img alt="logo" height={64} src={logo} />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
            <NavLink to="/">
              <Icon type="pie-chart" />
              <span>Home</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
            <NavLink to="/forms">
              <Icon type="desktop" />
              <span>Forms</span>
              </NavLink>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="7">Team 2</Menu.Item>
              <Menu.Item key="8">Team 3</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <NavLink to="/about">
                <Icon type="file" />
                <span>File</span>
              </NavLink>
            </Menu.Item>
          </Menu>
          <div style={{height:'48px'}} />
        </Sider>
        <Layout style={{marginLeft:this.state.leftMargin, transition: "all 0.2s"}}>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          {this.props.children}
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}