import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/css';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { updatePrice } from '../../../actions/purchaseInputs';

class Price extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdatePrice, governmentLoan } = this.props;

    if (governmentLoan > 0 && value >= 600000) {
      Modal.error({
        title: 'Help to Buy Equity Loan',
        content: 'Help to buy Equity loans are only granted on properties purchased for lower than £600k.',
        okText: 'OK',
        maskClosable: true,
      });
    } else {
      onUpdatePrice(value);
    }
  }

  render() {
    const { price } = this.props;

    return (
      <div className="PurchaseSection-price u-formInput">
        <InputNumber
          size="large"
          min={0}
          onChange={this.onChange}
          value={price}
          formatter={value => `£ ${value}`}
          parser={value => value.replace('£', '')}
        />
      </div>
    );
  }
}

Price.propTypes = {
  price: PropTypes.number,
  governmentLoan: PropTypes.number,
};

const mapStateToProps = (state) => ({
  price: state.purchaseInputs.price,
  governmentLoan: state.mortgageInputs.governmentLoan,
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
