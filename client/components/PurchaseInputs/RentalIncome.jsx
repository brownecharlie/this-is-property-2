import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updateRentalIncome } from '../../actions/purchaseInputs';

class RentalIncome extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const rentalIncome = parseFloat(event.target.value);
    const { onUpdateRentalIncome } = this.props;

    if (rentalIncome) onUpdateRentalIncome(rentalIncome);
  }

  render() {
    const { rentalIncome } = this.props;

    return (
      <div className="PurchaseInputs-rentalIncome">
        <span>Rental income </span>
        <input type="number" onChange={this.onChange} value={rentalIncome} />
      </div>
    );
  }
}

RentalIncome.propTypes = {
  rentalIncome: PropTypes.number,
};

const mapStateToProps = (state) => ({
  rentalIncome: state.purchaseInputs.rentalIncome,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateRentalIncome(rentalIncome) {
    dispatch(updateRentalIncome(rentalIncome));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RentalIncome);
