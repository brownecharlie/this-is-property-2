import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updateHouseholdIncome } from '../../../actions/mortgageInputs';

class HouseholdIncome extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateHouseholdIncome } = this.props;

    onUpdateHouseholdIncome(value);
  }

  render() {
    const { householdIncome } = this.props;

    return (
      <div className="MortgageSection-HouseholdIncome u-formInput">
        <span>Household income </span>
        <InputNumber
          min={0}
          step={1000}
          onChange={this.onChange}
          value={householdIncome}
          formatter={value => `£ ${value}`}
        />
      </div>
    );
  }
}

HouseholdIncome.propTypes = {
  householdIncome: PropTypes.number,
};

const mapStateToProps = (state) => ({
  householdIncome: state.mortgageInputs.householdIncome,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateHouseholdIncome(householdIncome) {
    dispatch(updateHouseholdIncome(householdIncome));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseholdIncome);
