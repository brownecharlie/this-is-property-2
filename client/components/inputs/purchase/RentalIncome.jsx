import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updateRentalIncome } from '../../../actions/purchaseInputs';

class RentalIncome extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateRentalIncome } = this.props;

    onUpdateRentalIncome(value);
  }

  render() {
    const { rentalIncome } = this.props;

    return (
      <div className="PurchaseSection-rentalIncome u-formInput">
        <span>Rental income (£ per month)</span>
        <InputNumber
          min={0}
          step={25}
          onChange={this.onChange}
          value={rentalIncome}
          formatter={value => `£ ${value}`}
          parser={value => value.replace('£', '')}
        />
      </div>
    );
  }
}

RentalIncome.propTypes = {
  rentalIncome: PropTypes.number,
};

const mapStateToProps = (state) => ({
  rentalIncome: state.purchaseInputs.rentalIncome,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateRentalIncome(rentalIncome) {
    dispatch(updateRentalIncome(rentalIncome));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalIncome);
