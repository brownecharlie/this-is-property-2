import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import calculateStampDuty from '../../../utils/calculateStampDuty';
import { updateStampDuty } from '../../../actions/purchaseInputs';

class StampDuty extends Component {
  componentWillReceiveProps(nextProps) {
    const { price, buyToLet, onUpdateStampDuty } = this.props;
    if (price !== nextProps.price || buyToLet !== nextProps.buyToLet) {
      onUpdateStampDuty(calculateStampDuty(nextProps.price, nextProps.buyToLet))
    }
  }

  shouldComponentUpdate(nextProps) {
    const { stampDuty } = this.props;
    if (stampDuty === nextProps.stampDuty) {
      return false;
    }
    return true;
  }

  render() {
    const { stampDuty } = this.props;

    return (
      <div className="PurchaseSection-stampDuty u-formInput">
        <span>{stampDuty}%</span>
      </div>
    );
  }
}

StampDuty.propTypes = {
  price: PropTypes.number,
  stampDuty: PropTypes.number,
  buyToLet: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  price: state.purchaseInputs.price,
  stampDuty: state.purchaseInputs.stampDuty,
  buyToLet: state.purchaseInputs.buyToLet,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateStampDuty(stampDuty) {
    dispatch(updateStampDuty(stampDuty));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StampDuty);
