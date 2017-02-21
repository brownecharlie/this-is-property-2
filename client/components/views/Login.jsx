import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';

import Form from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';

import 'antd/lib/form/style/css';
import 'antd/lib/checkbox/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/message/style/css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      if (nextProps.currentUser !== this.props.currentUser) {
        message.success(`Welcome back ${nextProps.currentUser.profile.name}!`);
      }
      browserHistory.push('/');
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) return;

      const { email, password } = values;

      Meteor.loginWithPassword(email, password, err => {
        if (err) message.error(err.reason);
      });
    });
  }

  handleForgot() {
    Meteor.call('sendPasswordResetEmail');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const emailParams = {
      rules: [
        { type: 'email', message: 'Please enter a valid email...' },
        { required: true, message: 'Please enter your email...' },
      ],
    };
    const passwordParams = {
      rules: [
        { required: true, message: 'Please enter your password...' },
      ],
    };
    const rememberParams = {
      valuePropName: 'checked',
      initialValue: false,
    };

    return (
      <Form onSubmit={this.handleSubmit} className="LoginForm">
        <Form.Item>
          {getFieldDecorator('email', emailParams)(
            <Input
              addonBefore={<Icon type="user" />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', passwordParams)(
            <Input
              addonBefore={<Icon type="lock" />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', rememberParams)(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="LoginForm-forgot" onClick={this.handleForgot}>Forgot password</a>
          <Button type="primary" htmlType="submit" className="LoginForm-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

Login.propTypes = {
  currentUser: PropTypes.object,
  form: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('currentUser');

  return {
    currentUser: Meteor.user(),
  };
}, Form.create()(Login));