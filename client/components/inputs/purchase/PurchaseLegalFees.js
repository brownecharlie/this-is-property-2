import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updatePurchaseLegalFees } from '../../../actions/purchaseInputs';

class PurchaseLegalFees extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdatePurchaseLegalFees } = this.props;

    onUpdatePurchaseLegalFees(value);
  }

  render() {
    const { purchaseLegalFees } = this.props;

    return (
      <div className="PurchaseSection-purchaseLegalFees u-formInput">
        <span>Purchase legal fees </span>
        <InputNumber
          min={0}
          step={25}
          onChange={this.onChange}
          value={purchaseLegalFees}
          formatter={value => `£ ${value}`}
          parser={value => value.replace('£', '')}
        />
      </div>
    );
  }
}

PurchaseLegalFees.propTypes = {
  purchaseLegalFees: PropTypes.number,
};

const mapStateToProps = (state) => ({
  purchaseLegalFees: state.purchaseInputs.purchaseLegalFees,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdatePurchaseLegalFees(purchaseLegalFees) {
    dispatch(updatePurchaseLegalFees(purchaseLegalFees));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseLegalFees);
