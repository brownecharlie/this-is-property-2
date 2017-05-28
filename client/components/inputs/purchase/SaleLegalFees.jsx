import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style/css';

import { updateSaleLegalFees } from '../../../actions/purchaseInputs';

class SaleLegalFees extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onUpdateSaleLegalFees } = this.props;

    onUpdateSaleLegalFees(value);
  }

  render() {
    const { saleLegalFees } = this.props;

    return (
      <div className="PurchaseSection-saleLegalFees u-formInput">
        <span>Sale legal fees </span>
        <InputNumber
          min={0}
          step={25}
          onChange={this.onChange}
          value={saleLegalFees}
          formatter={value => `£ ${value}`}
          parser={value => value.replace('£', '')}
        />
      </div>
    );
  }
}

SaleLegalFees.propTypes = {
  saleLegalFees: PropTypes.number,
};

const mapStateToProps = (state) => ({
  saleLegalFees: state.purchaseInputs.saleLegalFees,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateSaleLegalFees(saleLegalFees) {
    dispatch(updateSaleLegalFees(saleLegalFees));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaleLegalFees);
