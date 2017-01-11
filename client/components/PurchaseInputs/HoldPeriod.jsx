import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updateHoldPeriod } from '../../actions/purchaseInputs';

class HoldPeriod extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const holdPeriod = parseFloat(event.target.value);
    const { onUpdateHoldPeriod } = this.props;

    if (holdPeriod) onUpdateHoldPeriod(holdPeriod);
  }

  render() {
    const { holdPeriod } = this.props;

    return (
      <div className="PurchaseInputs-holdPeriod">
        <span>Hold period </span>
        <input type="number" onChange={this.onChange} value={holdPeriod} />
      </div>
    );
  }
}

HoldPeriod.propTypes = {
  holdPeriod: PropTypes.number,
};

const mapStateToProps = (state) => ({
  holdPeriod: state.purchaseInputs.holdPeriod,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateHoldPeriod(holdPeriod) {
    dispatch(updateHoldPeriod(holdPeriod));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoldPeriod);
