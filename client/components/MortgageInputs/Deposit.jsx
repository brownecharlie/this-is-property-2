import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import { updateDeposit } from '../../actions/mortgageInputs';

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateDeposit } = this.props;

    onUpdateDeposit(value);
  }

  formatTooltip(value) {
    return `${value}%`;
  }

  render() {
    const { deposit } = this.props;

    return (
      <div className="MortgageInputs-deposit">
        <span>Deposit </span>
        <Slider
          min={0}
          max={100}
          step={1}
          onChange={this.onChange}
          value={deposit}
          tipFormatter={this.formatTooltip}
        />
      </div>
    );
  }
}

Deposit.propTypes = {
  deposit: PropTypes.number,
};

const mapStateToProps = (state) => ({
  deposit: state.mortgageInputs.deposit,
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
