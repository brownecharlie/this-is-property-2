import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import formatCurrency from '../../../utils/formatCurrency';
import { calculateMortgageSize } from '../../../utils/calculatePropertyReturns';
import { updateMortgageSize } from '../../../actions/mortgageInputs';

class MortgageSize extends Component {
  componentDidMount() {
    console.log(this.carousel);
  }

  componentWillReceiveProps(nextProps) {
    const {
      deposit,
      governmentLoan,
      price,
      householdIncome,
      onUpdateMortgageSize,
    } = this.props;

    if (deposit !== nextProps.deposit ||
        governmentLoan !== nextProps.governmentLoan ||
        price !== nextProps.price ||
        householdIncome !== nextProps.householdIncome) {
      onUpdateMortgageSize(
        calculateMortgageSize(nextProps.deposit, nextProps.governmentLoan)
      );
    }
  }

  shouldComponentUpdate(nextProps) {
    const { mortgageSize, price, householdIncome } = this.props;
    if (mortgageSize === nextProps.mortgageSize && 
        price === nextProps.price && householdIncome === nextProps.householdIncome) {
      return false;
    }
    return true;
  }

  render() {
    const { mortgageSize, price, householdIncome } = this.props;

    const actualCost = price * (mortgageSize / 100);
    const incomeMultiplier = actualCost / householdIncome;

    return (
      <div className="PurchaseSection-MortgageSize u-formInput">
        <span>Mortgage size </span>
        <div ref={ref => this.carousel = ref}>
          <span data-index="1">{mortgageSize}%</span>
          <span data-index="2">{formatCurrency(actualCost)}</span>
          <span data-index="3">{incomeMultiplier.toFixed(1)} * income</span>
        </div>
      </div>
    );
  }
}

MortgageSize.propTypes = {
  mortgageSize: PropTypes.number,
  deposit: PropTypes.number,
  governmentLoan: PropTypes.number,
  householdIncome: PropTypes.number,
  price: PropTypes.number,
};

const mapStateToProps = (state) => ({
  mortgageSize: state.mortgageInputs.mortgageSize,
  deposit: state.mortgageInputs.deposit,
  governmentLoan: state.mortgageInputs.governmentLoan,
  householdIncome: state.mortgageInputs.householdIncome,
  price: state.purchaseInputs.price,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateMortgageSize(mortgageSize) {
    dispatch(updateMortgageSize(mortgageSize));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MortgageSize);
