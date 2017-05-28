import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updateHoldPeriod } from '../../../actions/purchaseInputs';

class HoldPeriod extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateHoldPeriod } = this.props;

    onUpdateHoldPeriod(value);
  }

  render() {
    const { holdPeriod } = this.props;

    return (
      <div className="PurchaseSection-holdPeriod u-formInput">
        <InputNumber
          min={0}
          onChange={this.onChange}
          value={holdPeriod}
          formatter={value => `years: ${value}`}
          parser={value => value.replace('years:', '')}
        />
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
