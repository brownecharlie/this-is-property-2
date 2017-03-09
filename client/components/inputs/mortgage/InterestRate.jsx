import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updateInterestRate } from '../../../actions/mortgageInputs';

class InterestRate extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateInterestRate } = this.props;

    onUpdateInterestRate(value);
  }

  render() {
    const { interestRate } = this.props;

    return (
      <div className="MortgageSection-interestRate u-formInput">
        <span>Interest rate </span>
        <InputNumber
          min={0}
          step={0.1}
          onChange={this.onChange}
          value={interestRate}
          formatter={value => {
            console.log(value);
            return `% ${value}`;
          }}
        />
      </div>
    );
  }
}

InterestRate.propTypes = {
  interestRate: PropTypes.number,
};

const mapStateToProps = (state) => ({
  interestRate: state.mortgageInputs.interestRate,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateInterestRate(interestRate) {
    dispatch(updateInterestRate(interestRate));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterestRate);
