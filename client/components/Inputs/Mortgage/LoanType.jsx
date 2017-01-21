import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Select from 'antd/lib/select';
import 'antd/lib/select/style/css';

import { LOAN_TYPE_VALUES } from '../../../constants/formValues';

import { updateLoanType } from '../../../actions/mortgageInputs';

class LoanType extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onUpdateLoanType(value);
  }

  get selectOptions() {
    return LOAN_TYPE_VALUES.map(item => (
      <Select.Option key={item.value}>{item.label}</Select.Option>
    ));
  }

  render() {
    const { loanType } = this.props;

    return (
      <div className="MortgageSection-loanType u-formInput">
        <span>Loan type</span>
        <Select onChange={this.onChange} value={loanType}>
          {this.selectOptions}
        </Select>
      </div>
    );
  }
}

LoanType.propTypes = {
  loanType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  loanType: state.mortgageInputs.loanType,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateLoanType(loanType) {
    dispatch(updateLoanType(loanType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanType);
