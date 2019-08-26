import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { withRouter } from "react-router-dom";
import "./Login.css";
import axios from "../../common/axios-global";
import Qs from "qs";

var MD5 = require("crypto-js/md5");

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }
      values.password = MD5(values.password).toString();
      let that = this;
      axios.post("/common/login",Qs.stringify(values))
      .then(function(res){
        let result = res.data;
        if(result && result.code === 1){
          that.props.history.push("/");
          return;
        }
        message.error(result.msg);
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
            initialValue: false,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="/reset-password">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm);