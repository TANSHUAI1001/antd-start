import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { NavLink, withRouter } from 'react-router-dom';
import {baseURL} from "../../common/config";
import logo from "../../common/logo.svg";
import "./FixedSider.css";

import {setSessionInfoAsync} from "../../actions/CommonAction";

const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class FixedSider extends React.Component {
  state = {
    collapsed: false,
    leftMargin: '200px'
  };

  componentDidMount(){
    if(!this.props.sessionStore.user){
      console.log("init user")
      this.props.initUser();
    }
    if(!this.props.sessionStore.menu){
      console.log("init menu")
      this.props.initMenu();
    }
  }

  onCollapse = collapsed => {
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
          <a href="/">
            <div className="logo">
              <img alt="logo" height={64} src={logo} />
            </div>
          </a>
          <Menu theme="dark" selectedKeys={[this.props.history.location.pathname]} mode="inline">
            {this.props.sessionStore.menu ? this.props.sessionStore.menu.map((item)=>{
              if(item.sub.length > 0){
                return <SubMenu
                  key={item.priority}
                  title={
                    <span>
                      <Icon type={item.classes.split(" ")[1]} />
                      <span>{item.name}</span>
                    </span>
                  }
                >
                  {item.sub.map((sub) => {
                   return <Menu.Item key={sub.value}>
                    <NavLink to={sub.value}>
                      <Icon type={sub.classes.split(" ")[1]} />
                      <span>{sub.name}</span>
                      </NavLink>
                    </Menu.Item>
                  })}
                </SubMenu>
              }else{
                return <Menu.Item key={item.value}>
                <NavLink to={item.value}>
                  <Icon type={item.classes.split(" ")[1]} />
                  <span>{item.name}</span>
                  </NavLink>
                </Menu.Item>
              }
            }) : null}
          </Menu>
          <div style={{height:'48px'}} />
        </Sider>
        <Layout style={{marginLeft:this.state.leftMargin, transition: "all 0.2s"}}>
          <Header style={{ background: '#fff', padding: 0, boxShadow:'0 1px 4px rgba(0,21,41,.08)' }}>
          
            {this.props.sessionStore.user?<Avatar src={baseURL+"/"+this.props.sessionStore.user.avatar} />:null}
          </Header>
          {this.props.children}
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

/**
 * mapStateToProps和mapDispatchToProps。
 * 它们定义了 UI 组件的业务逻辑。
 * 前者负责输入逻辑，即将state映射到 UI 组件的参数（props）。
 * 后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action 。
 */

const mapStateToProps = (state) => {
  return {sessionStore:state.sessionStore}
}
const mapDispatchToProps = (dispatch) => {
  return{
    initUser: ()=>{
      dispatch(setSessionInfoAsync("user"));
    },
    initMenu: ()=>{
      dispatch(setSessionInfoAsync("menu"));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(FixedSider));