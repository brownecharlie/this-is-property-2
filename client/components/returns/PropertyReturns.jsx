import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

import formatCurrency from '../../utils/formatCurrency';
import {
  calculateSalePrice,
  calculateSaleCosts,
  calculatePurchaseCosts,
  calculateMortgagePayments,
  calculateTotalMortgagePayment,
  calculateTotalRentalIncome,
  calculateProfit,
  calculateDeposit,
  calculateStampDuty,
  calculateProfitOnCost,
  calculateReturnOnEquity,
  calculateGovernmentProfit,
  calculateOwnersProfit,
} from '../../utils/calculatePropertyReturns';

class PropertyReturns extends Component {
  render() {
    const {
      growth,
      holdPeriod,
      price,
      saleAgentFees,
      saleLegalFees,
      purchaseAgentFees,
      purchaseLegalFees,
      surveyFees,
      rentalIncome,
      brokerFee,
      stampDuty,
      deposit,
      loanType,
      interestRate,
      term,
      buyToLet,
      adminDistrict,
      fiveYearGrowth,
      governmentLoan,
      headerClicked,
    } = this.props;

    const salePrice = calculateSalePrice(growth, holdPeriod, price);
    const saleCosts = calculateSaleCosts(saleAgentFees, salePrice, saleLegalFees);
    const purchaseCosts = calculatePurchaseCosts(purchaseAgentFees, price, purchaseLegalFees, surveyFees, stampDuty, price);
    const monthlyMortgagePayment = calculateMortgagePayments(price, deposit, loanType, interestRate, term).monthly;
    const totalMortgagePayment = calculateTotalMortgagePayment(monthlyMortgagePayment, holdPeriod, brokerFee);
    const totalRentalIncome = calculateTotalRentalIncome(rentalIncome, holdPeriod);
    const profit = calculateProfit(salePrice, saleCosts, price, purchaseCosts, totalMortgagePayment, brokerFee, totalRentalIncome);
    const profitOnCost = calculateProfitOnCost(profit, saleCosts, price, purchaseCosts, totalMortgagePayment, totalRentalIncome);
    const governmentProfit = calculateGovernmentProfit(price, salePrice, governmentLoan);
    const ownersProfit = calculateOwnersProfit(profit, governmentProfit);

    const data = [
      { name: 'Assumed Growth', value: growth, color: '#0088FE' },
      { name: 'Projected Growth', value: fiveYearGrowth, color: '#00C49F' },
    ];

    return (
      <section className="ReturnsContainer-section is-active">
        <header className="ReturnsContainer-header" onClick={headerClicked}>
          <h3>Property Returns</h3>
          <Icon type="caret-down" className="u-floatRight"/>
        </header>
        <div className="ReturnsContainer-values">
          <ul>
            <li className="ReturnsContainer-profit">
              <span>Profit on cost: </span>
              <span className="u-floatRight">{profitOnCost.toFixed(2)}%</span>
            </li>
            <li className="ReturnsContainer-profit">
              <span>Profit: </span>
              <span className="u-floatRight">{formatCurrency(profit)}</span>
            </li>
            <li className="ReturnsContainer-salePrice">
              <span>Sale price: </span>
              <span className="u-floatRight">{formatCurrency(salePrice)}</span>
            </li>
            <li className="ReturnsContainer-saleCosts">
              <span>Sale costs: </span>
              <span className="u-floatRight">{formatCurrency(saleCosts)}</span>
            </li>
            <li className="ReturnsContainer-price">
              <span>Purchase price: </span>
              <span className="u-floatRight">{formatCurrency(price)}</span>
            </li>
            <li className="ReturnsContainer-costs">
              <span>Purchase costs: </span>
              <span className="u-floatRight">{formatCurrency(purchaseCosts)}</span>
            </li>
            <li className="ReturnsContainer-mortgagePayments">
              <span>Mortgage payments: </span>
              <span className="u-floatRight">{formatCurrency(totalMortgagePayment)}</span>
            </li>
            <li className="ReturnsContainer-rentalIncome">
              <span>Rental income: </span>
              <span className="u-floatRight">{formatCurrency(totalRentalIncome)}</span>
            </li>
            <li className="ReturnsContainer-holdPeriod">
              <span>Hold period (years): </span>
              <span className="u-floatRight">{`${holdPeriod} years`}</span>
            </li>
            <li className="ReturnsContainer-holdPeriod">
              <span>Growth (% p.a.): </span>
              <span className="u-floatRight">{`${growth}%`}</span>
            </li>
            <li className="ReturnsContainer-buyToLet">
              <span>Buy to let: </span>
              <span className="u-floatRight">{buyToLet ? 'Yes' : 'No'}</span>
            </li>
            <li className="ReturnsContainer-stamDuty">
              <span>Stamp duty: </span>
              <span className="u-floatRight">{`${stampDuty}%`}</span>
            </li>
            {fiveYearGrowth ?
            <li className="ReturnsContainer-chart">
              <span>5 year average growth in {adminDistrict}</span>
              <ResponsiveContainer height={230}>
                <BarChart width={300} height={230} data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="5 5" />
                  <Bar dataKey="value" isAnimationActive={false}>
                  {
                    data.map((entry, index) => <Cell key={index} fill={entry.color}/>)
                  }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </li> : null
            }
          </ul>
        </div>
      </section>
    );
  }
}

PropertyReturns.propTypes = {
  holdPeriod: PropTypes.number,
  growth: PropTypes.number,
  price: PropTypes.number,
  stampDuty: PropTypes.number,
  saleAgentFees: PropTypes.number,
  saleLegalFees: PropTypes.number,
  purchaseAgentFees: PropTypes.number,
  purchaseLegalFees: PropTypes.number,
  surveyFees: PropTypes.number,
  rentalIncome: PropTypes.number,
  brokerFee: PropTypes.number,
  deposit: PropTypes.number,
  loanType: PropTypes.string,
  interestRate: PropTypes.number,
  term: PropTypes.number,
  buyToLet: PropTypes.bool,
  adminDistrict: PropTypes.string,
  fiveYearGrowth: PropTypes.number,
  governmentLoan: PropTypes.number,
  headerClicked: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  holdPeriod: state.purchaseInputs.holdPeriod,
  growth: state.purchaseInputs.growth,
  price: state.purchaseInputs.price,
  stampDuty: state.purchaseInputs.stampDuty,
  saleAgentFees: state.purchaseInputs.saleAgentFees,
  saleLegalFees: state.purchaseInputs.saleLegalFees,
  purchaseAgentFees: state.purchaseInputs.purchaseAgentFees,
  purchaseLegalFees: state.purchaseInputs.purchaseLegalFees,
  surveyFees: state.purchaseInputs.surveyFees,
  rentalIncome: state.purchaseInputs.rentalIncome,
  brokerFee: state.mortgageInputs.brokerFee,
  deposit: state.mortgageInputs.deposit,
  loanType: state.mortgageInputs.loanType,
  interestRate: state.mortgageInputs.interestRate,
  term: state.mortgageInputs.term,
  buyToLet: state.purchaseInputs.buyToLet,
  adminDistrict: state.propertySearch.adminDistrict,
  governmentLoan: state.mortgageInputs.governmentLoan,
  fiveYearGrowth: state.propertySearch.fiveYearGrowth,
});

export default connect(
  mapStateToProps,
)(PropertyReturns);
