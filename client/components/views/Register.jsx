import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordDirty: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.checkName = this.checkName.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;

      const params = {
        ...values,
        roles: ['subscriber'],
      };

      Meteor.call('createNewUser', params);
    });
  }

  handlePasswordBlur(event) {
    const value = event.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two password you entered does not match!');
    } else {
      callback();
    }
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  checkName(rule, value, callback) {
    const form = this.props.form;
    if (value && !value.match(/^[a-z ,.'-]+$/i)) {
      callback('Please enter a valid name');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} className="RegisterForm">
        <Form.Item label="First Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('firstName', {
            rules: [
              { required: true, message: 'Please enter your first name...' },
              { validator: this.checkName },
            ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Last Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('lastName', {
            rules: [
              { required: true, message: 'Please enter your last name...' },
              { validator: this.checkName },
            ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Email" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' }
            ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="Password" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your password!' },
              { validator: this.checkConfirm },
            ],
          })(
            <Input type="password" onBlur={this.handlePasswordBlur} />
          )}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback {...formItemLayout}>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: 'Please confirm your password!' },
              { validator: this.checkPassword },
            ],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </Form.Item>
      </Form>
    );
  }
}

Register.propTypes = {
  currentUser: PropTypes.object,
  form: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('currentUser');

  return {
    currentUser: Meteor.user(),
  };
}, Form.create()(Register));