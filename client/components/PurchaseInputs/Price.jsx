import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import calculateStampDuty from '../../utils/calculateStampDuty';
import { updatePrice, updateStampDuty } from '../../actions/purchaseInputs';

class Price extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const price = parseFloat(event.target.value);
    const { onUpdatePrice, onUpdateStampDuty } = this.props;

    onUpdatePrice(price);
    // onUpdateStampDuty(calculateStampDuty(price));
  }

  render() {
    const { price } = this.props;

    return (
      <div className="PurchaseInputs-price">
        <span>Price </span>
        <input type="text" onChange={this.onChange} value={price} />
      </div>
    );
  }
}

Price.propTypes = {
  price: PropTypes.number,
};

const mapStateToProps = (state) => ({
  price: state.purchaseInputs.price,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdatePrice(price) {
    dispatch(updatePrice(price));
  },
  onUpdateStampDuty(stampDuty) {
    dispatch(updateStampDuty(stampDuty));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Price);
