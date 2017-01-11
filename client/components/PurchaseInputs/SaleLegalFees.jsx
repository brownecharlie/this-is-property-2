import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updateSaleLegalFees } from '../../actions/purchaseInputs';

class SaleLegalFees extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const saleLegalFees = parseFloat(event.target.value);
    const { onUpdateSaleLegalFees } = this.props;

    if (saleLegalFees) onUpdateSaleLegalFees(saleLegalFees);
  }

  render() {
    const { saleLegalFees } = this.props;

    return (
      <div className="PurchaseInputs-saleLegalFees">
        <span>Sale legal fees </span>
        <input type="number" onChange={this.onChange} value={saleLegalFees} />
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
