import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updateSurveyFees } from '../../../actions/purchaseInputs';

class SurveyFees extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateSurveyFees } = this.props;

    onUpdateSurveyFees(value);
  }

  render() {
    const { surveyFees } = this.props;

    return (
      <div className="PurchaseSection-surveyFees u-formInput">
        <span>Survey fees </span>
        <InputNumber
          min={0}
          step={25}
          onChange={this.onChange}
          value={surveyFees}
          formatter={value => `£ ${value}`}
          parser={value => value.replace('£', '')}
        />
      </div>
    );
  }
}

SurveyFees.propTypes = {
  surveyFees: PropTypes.number,
};

const mapStateToProps = (state) => ({
  surveyFees: state.purchaseInputs.surveyFees,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSurveyFees(surveyFees) {
    dispatch(updateSurveyFees(surveyFees));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyFees);
