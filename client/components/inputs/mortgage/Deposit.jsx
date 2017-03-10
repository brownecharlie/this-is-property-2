import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import { updateDeposit } from '../../../actions/mortgageInputs';

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateDeposit } = this.props;

    onUpdateDeposit(value);
  }

  render() {
    const { deposit, governmentLoan } = this.props;

    return (
      <div className="MortgageSection-deposit u-formInput">
        <span>Deposit </span>
        <Slider
          min={0}
          max={100 - governmentLoan}
          step={1}
          onChange={this.onChange}
          value={deposit}
          tipFormatter={value => `${value}%`}
        />
      </div>
    );
  }
}

Deposit.propTypes = {
  deposit: PropTypes.number,
  governmentLoan: PropTypes.number,
};

const mapStateToProps = (state) => ({
  deposit: state.mortgageInputs.deposit,
  governmentLoan: state.mortgageInputs.governmentLoan,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateDeposit(deposit) {
    dispatch(updateDeposit(deposit));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deposit);
