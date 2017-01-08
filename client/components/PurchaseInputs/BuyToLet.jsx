import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { updateBuyToLet } from '../../actions/purchaseInputs';

class BuyToLet extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onUpdateBuyToLet(event.target.checked);
  }

  render() {
    const { buyToLet } = this.props;

    return (
      <div className="PurchaseInputs-buyToLet">
        <span>Buy to let </span>
        <input type="checkbox" onChange={this.onChange} />
      </div>
    );
  }
}

BuyToLet.propTypes = {
  buyToLet: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  buyToLet: state.purchaseInputs.buyToLet,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateBuyToLet(buyToLet) {
    dispatch(updateBuyToLet(buyToLet));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyToLet);
