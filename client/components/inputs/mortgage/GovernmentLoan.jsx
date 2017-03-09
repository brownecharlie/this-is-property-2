import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/css';

import { updateGovernmentLoan } from '../../../actions/mortgageInputs';

class GovernmentLoan extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateGovernmentLoan } = this.props;

    onUpdateGovernmentLoan(value);
  }

  render() {
    const { governmentLoan } = this.props;

    return (
      <div className="MortgageSection-governmentLoan u-formInput">
        <span>GovernmentLoan </span>
        <Slider
          min={0}
          max={20}
          step={1}
          onChange={this.onChange}
          value={governmentLoan}
          tipFormatter={value => `${value}%`}
        />
      </div>
    );
  }
}

GovernmentLoan.propTypes = {
  governmentLoan: PropTypes.number,
};

const mapStateToProps = (state) => ({
  governmentLoan: state.mortgageInputs.governmentLoan,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateGovernmentLoan(governmentLoan) {
    dispatch(updateGovernmentLoan(governmentLoan));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GovernmentLoan);
