import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updatePrice } from '../../../actions/purchaseInputs';

class Price extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdatePrice } = this.props;

    onUpdatePrice(value);
  }

  render() {
    const { price } = this.props;

    return (
      <div className="PurchaseSection-price u-formInput">
        <span>Price </span>
        <InputNumber min={0} onChange={this.onChange} value={price} />
      </div>
    );
  }
}

Price.propTypes = {
  price: PropTypes.number,
};

const mapStateToProps = (state) => ({
  price: state.purchaseInputs.price,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdatePrice(price) {
    dispatch(updatePrice(price));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Price);
