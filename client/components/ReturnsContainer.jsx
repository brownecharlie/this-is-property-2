import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import toggleDropdown from '../utils/toggleDropdown';
import * as returns from '../utils/calculatePropertyReturns';

import PropertyReturns from './returns/PropertyReturns';
import DayOnePayment from './returns/DayOnePayment';
import MortgagePayments from './returns/MortgagePayments';

class RetursContanier extends Component {
  headerClicked(event) {
    toggleDropdown(event, '.ReturnsContainer-values');
  }

  shouldComponentUpdate(nextProps) {
    const { purchaseInputs, mortgageInputs, propertySearch } = this.props;

    if (purchaseInputs === nextProps.purchaseInputs &&
        mortgageInputs === nextProps.mortgageInputs &&
        propertySearch === nextProps.propertySearch) {
      return false;
    }

    return true;
  }

  render() {
    const { mortgageInputs, purchaseInputs, propertySearch } = this.props;

    const {
      deposit,
      interestRate,
      brokerFee,
      loanType,
      term,
      governmentLoan,
      mortgageSize,
      householdIncome,
    } = mortgageInputs;

    const {
      price,
      stampDuty,
      buyToLet,
      holdPeriod,
      growth,
      rentalIncome,
      surveyFees,
      purchaseLegalFees,
      purchaseAgentFees,
      saleLegalFees,
      saleAgentFees,
    } = purchaseInputs;

    const {
      listing,
      adminDistrict,
      region,
      fiveYearGrowth,
    } = propertySearch;

    const salePrice = returns.calculateSalePrice(growth, holdPeriod, price);
    const saleCosts = returns.calculateSaleCosts(saleAgentFees, salePrice, saleLegalFees);
    const purchaseCosts = returns.calculatePurchaseCosts(purchaseAgentFees, price, purchaseLegalFees, surveyFees, stampDuty, price);
    const monthlyMortgagePayment = returns.calculateMortgagePayments(price, deposit, loanType, interestRate, term);
    const totalMortgagePayment = returns.calculateTotalMortgagePayment(monthlyMortgagePayment, holdPeriod, brokerFee);
    const totalRentalIncome = returns.calculateTotalRentalIncome(rentalIncome, holdPeriod);
    const governmentLoanInterest = returns.calculateGovernmentLoanInterest(governmentLoan, price, holdPeriod);
    const profit = returns.calculateProfit(salePrice, saleCosts, price, purchaseCosts, totalMortgagePayment, brokerFee, governmentLoanInterest, totalRentalIncome);
    const totalCosts = returns.calculateTotalCost(saleCosts, price, purchaseCosts, totalMortgagePayment, totalRentalIncome);    
    const profitOnCost = returns.calculateProfitOnCost(profit, totalCosts);
    const governmentProfit = returns.calculateGovernmentProfit(price, salePrice, governmentLoan);
    const ownersProfit = returns.calculateOwnersProfit(profit, governmentProfit);
    const loanAmount = returns.calculateLoanAmount(price, deposit);
    const depositPaid = returns.calculateDeposit(price, deposit);
    const interestAndAmortisation = returns.calculateInterestAndAmortisation(loanAmount, monthlyMortgagePayment * 12, interestRate, term);
    const dayOnePayment = returns.calculateDayOnePayment(deposit, purchaseAgentFees, stampDuty, price, purchaseLegalFees, surveyFees, brokerFee);
    const stampDutyPaid = returns.calculateStampDuty(stampDuty, price);

    const interestPaid = interestAndAmortisation.reduce((sum, item, index) => {
      if (index > 4) return sum + 0;
      return sum + item.interest
    }, 0);

    const amortisationPaid = interestAndAmortisation.reduce((sum, item, index) => {
      if (index > 4) return sum + 0;
      return sum + item.amortisation
    }, 0);

    const bankCosts = returns.calculateBankCosts(interestPaid, amortisationPaid, brokerFee);
    const allInBorrowerCosts = returns.calculateAllInBorrowerCosts(dayOnePayment, bankCosts);
    const returnOnEquity = returns.calculateReturnOnEquity(ownersProfit, allInBorrowerCosts);

    const actualSaleAgentFees = saleAgentFees * salePrice / 100;
    const actualPurchaseAgentFees = purchaseAgentFees * price / 100;

    const prProps = {
      price,
      growth,
      holdPeriod,
      actualSaleAgentFees,
      saleLegalFees,
      actualPurchaseAgentFees,
      purchaseLegalFees,
      surveyFees,
      rentalIncome,
      stampDutyPaid,
      adminDistrict,
      fiveYearGrowth,
      salePrice,
      saleCosts,
      purchaseCosts,
      totalMortgagePayment,
      totalRentalIncome,
      profit,
      totalCosts,
      profitOnCost,
      governmentProfit,
      ownersProfit,
      governmentLoanInterest,
      returnOnEquity,
      allInBorrowerCosts,
    };

    const dopProps = {
      buyToLet,
      purchaseLegalFees,
      surveyFees,
      brokerFee,
      stampDuty,
      dayOnePayment,
      depositPaid,
      stampDutyPaid,
      allInBorrowerCosts,
      bankCosts,
      interestPaid,
      amortisationPaid,
    };

    const mpProps = {
      brokerFee,
      deposit,
      interestRate,
      loanType,
      term,
      loanAmount,
      depositPaid,
      monthlyMortgagePayment,
      interestAndAmortisation,
      interestPaid,
      amortisationPaid,
      bankCosts,
    };

    return (
      <article className="ReturnsContainer">
        <PropertyReturns calculations={prProps} headerClicked={this.headerClicked} />
        <DayOnePayment calculations={dopProps} headerClicked={this.headerClicked} />
        <MortgagePayments calculations={mpProps} headerClicked={this.headerClicked} />
      </article>
    );
  }
}

PropertyReturns.propTypes = {
  purchaseInputs: PropTypes.object,
  mortgageInputs: PropTypes.object,
  propertySearch: PropTypes.object,
};

const mapStateToProps = (state) => ({
  purchaseInputs: state.purchaseInputs,
  mortgageInputs: state.mortgageInputs,
  propertySearch: state.propertySearch,
});

export default connect(
  mapStateToProps,
)(RetursContanier);