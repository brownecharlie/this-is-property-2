import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import { updatePurchaseAgentFees } from '../../../actions/purchaseInputs';

class PurchaseAgentFees extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdatePurchaseAgentFees } = this.props;

    onUpdatePurchaseAgentFees(value);
  }

  render() {
    const { purchaseAgentFees } = this.props;

    return (
      <div className="PurchaseSection-purchaseAgentFees u-formInput">
        <span>Purchase agent fees </span>
        <Slider
          min={0}
          max={3}
          step={0.1}
          onChange={this.onChange}
          value={purchaseAgentFees}
          tipFormatter={value => `${value}%`}
        />
      </div>
    );
  }
}

PurchaseAgentFees.propTypes = {
  purchaseAgentFees: PropTypes.number,
};

const mapStateToProps = (state) => ({
  purchaseAgentFees: state.purchaseInputs.purchaseAgentFees,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdatePurchaseAgentFees(purchaseAgentFees) {
    dispatch(updatePurchaseAgentFees(purchaseAgentFees));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseAgentFees);
