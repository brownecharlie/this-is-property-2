import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.clearEmail = this.clearEmail.bind(this);
    this.attemptUserLogin = this.attemptUserLogin.bind(this);
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  clearEmail() {
    this.emailInput.focus();
    this.setState({ email: '' });
  }

  clearPassword() {
    this.emailInput.focus();
    this.setState({ password: '' });
  }

  attemptUserLogin() {
    const { email, password } = this.state;
    console.log(email, password);
  }
 
  render() {
    const { email, password } = this.state;
    const emailSuffix = email ? <Icon type="close-circle" onClick={this.clearEmail} /> : null;
    const passwordSuffix = password ? <Icon type="close-circle" onClick={this.clearPassword} /> : null;

    return (
      <div className="Login">
        this is the Login page!

        <Input
          placeholder="Enter your email"
          prefix={<Icon type="user" />}
          suffix={emailSuffix}
          value={email}
          onChange={this.onChangeEmail}
          ref={node => this.emailInput = node}
        />
        <Input
          placeholder="Enter your password"
          prefix={<Icon type="lock" />}
          suffix={passwordSuffix}
          value={password}
          onChange={this.onChangePassword}
          ref={node => this.passwordInput = node}
        />
        <Button onClick={this.attemptUserLogin} type="ghost">Login</Button>
      </div>
    );
  }
}

Login.propTypes = {
  users: PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe('allUsers');

  return {
    users: Meteor.users.find().fetch(),
  };
}, Login);