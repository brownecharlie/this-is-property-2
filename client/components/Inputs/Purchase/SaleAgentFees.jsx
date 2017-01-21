import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import { updateSaleAgentFees } from '../../../actions/purchaseInputs';

class SaleAgentFees extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateSaleAgentFees } = this.props;

    onUpdateSaleAgentFees(value);
  }

  render() {
    const { saleAgentFees } = this.props;

    return (
      <div className="PurchaseSection-saleAgentFees u-formInput">
        <span>Sale agent fees </span>
        <Slider
          min={0}
          max={3}
          step={0.1}
          onChange={this.onChange}
          value={saleAgentFees}
          tipFormatter={value => `${value}%`}
        />
      </div>
    );
  }
}

SaleAgentFees.propTypes = {
  saleAgentFees: PropTypes.number,
};

const mapStateToProps = (state) => ({
  saleAgentFees: state.purchaseInputs.saleAgentFees,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSaleAgentFees(saleAgentFees) {
    dispatch(updateSaleAgentFees(saleAgentFees));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleAgentFees);
