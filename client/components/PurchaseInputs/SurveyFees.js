import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updateSurveyFees } from '../../actions/purchaseInputs';

class SurveyFees extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const surveyFees = parseFloat(event.target.value);
    const { onUpdateSurveyFees } = this.props;

    if (surveyFees) onUpdateSurveyFees(surveyFees);
  }

  render() {
    const { surveyFees } = this.props;

    return (
      <div className="PurchaseInputs-surveyFees">
        <span>Survey fees </span>
        <input type="number" onChange={this.onChange} value={surveyFees} />
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
