import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style/css';

import { updateBuyToLet } from '../../../actions/purchaseInputs';

class BuyToLet extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateBuyToLet } = this.props;

    onUpdateBuyToLet(value);
  }

  render() {
    return <Switch onChange={this.onChange} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onUpdateBuyToLet(buyToLet) {
    dispatch(updateBuyToLet(buyToLet));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(BuyToLet);
