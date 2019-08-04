import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import "./Login.css";
import {POST,GET} from "../common/Request";
import { createHashHistory } from "history";
const history = createHashHistory();

var MD5 = require("crypto-js/md5");

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Received values of form: ', values);
      console.log(values);
      values.password = MD5(values.password).toString();
      console.log(values);
      POST("/common/login",values).then(function(res){
        console.log(res);
        if(res && res.code === 1){
          sessionStorage.setItem("user",JSON.stringify(res.data.user));
          sessionStorage.setItem("menus",JSON.stringify(res.data.menus));
          history.replace("/");
          return;
        }
        message.error(res.msg);
      })
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remembered', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="#/reset-password">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="#/register">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;