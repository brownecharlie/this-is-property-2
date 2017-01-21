import React, { Component, PropTypes } from 'react';
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
    const { buyToLet } = this.props;

    return (
      <div className="PurchaseSection-buyToLet u-formInput">
        <span>Buy to let </span>
        <Switch onChange={this.onChange} />
      </div>
    );
  }
}

BuyToLet.propTypes = {
  buyToLet: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  buyToLet: state.purchaseInputs.buyToLet,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateBuyToLet(buyToLet) {
    dispatch(updateBuyToLet(buyToLet));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyToLet);
