import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updatePurchaseLegalFees } from '../../actions/purchaseInputs';

class PurchaseLegalFees extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const purchaseLegalFees = parseFloat(event.target.value);
    const { onUpdatePurchaseLegalFees } = this.props;

    if (purchaseLegalFees) onUpdatePurchaseLegalFees(purchaseLegalFees);
  }

  render() {
    const { purchaseLegalFees } = this.props;

    return (
      <div className="PurchaseInputs-purchaseLegalFees">
        <span>Purchase legal fees </span>
        <input type="number" onChange={this.onChange} value={purchaseLegalFees} />
      </div>
    );
  }
}

PurchaseLegalFees.propTypes = {
  purchaseLegalFees: PropTypes.number,
};

const mapStateToProps = (state) => ({
  purchaseLegalFees: state.purchaseInputs.purchaseLegalFees,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdatePurchaseLegalFees(purchaseLegalFees) {
    dispatch(updatePurchaseLegalFees(purchaseLegalFees));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseLegalFees);
