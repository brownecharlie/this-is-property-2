import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

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
  calculateDayOnePayment,
  calculateDeposit,
  calculateStampDuty,
} from '../../utils/calculatePropertyReturns';

class PropertyReturns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fiveYearGrowth: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { propertyListings } = this.props;

    if (propertyListings !== nextProps.propertyListings) {
      const { latitude: lat, longitude: lon } = nextProps.propertyListings;

      Meteor.call('getAdminDistrict', { lat, lon }, (err, result) => {
        if (err) { console.log(err); return; }

        const adminDistrict = result.data.result[0].admin_district.replace(/ /g, '-');

        Meteor.call('getAveragePrices', adminDistrict, (err, result) => {
          if (err) { console.log(err); return; }

          const items = result.data.result.items;
          const fiveYearGrowth = (items[47].annualChange + items[35].annualChange + 
                                  items[23].annualChange + items[11].annualChange + 
                                  items[0].annualChange) / 5;

          this.setState({ fiveYearGrowth });
        });
      });
    }
  }

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
    } = this.props;

    const salePrice = calculateSalePrice(growth, holdPeriod, price);
    const saleCosts = calculateSaleCosts(saleAgentFees, salePrice, saleLegalFees);
    const purchaseCosts = calculatePurchaseCosts(purchaseAgentFees, price, purchaseLegalFees, surveyFees, stampDuty, price);
    const monthlyMortgagePayment = calculateMortgagePayments(price, deposit, loanType, interestRate, term).monthly;
    const totalMortgagePayment = calculateTotalMortgagePayment(monthlyMortgagePayment, holdPeriod);
    const totalRentalIncome = calculateTotalRentalIncome(rentalIncome, holdPeriod);
    const profit = calculateProfit(salePrice, saleCosts, price, purchaseCosts, totalMortgagePayment, brokerFee, totalRentalIncome);

    const data = [
      { name: 'Assumned Growth', value: growth, color: '#0088FE' },
      { name: 'Projected Growth', value: this.state.fiveYearGrowth, color: '#00C49F' },
    ];

    return (
      <div className="PropertyReturns">
        <div className="PropertyReturns-column">
          <div className="PropertyReturns-profit">
            <span>Profit: </span>
            <span>{formatCurrency(profit)}</span>
          </div>
          <div className="PropertyReturns-salePrice">
            <span>Sale price: </span>
            <span>{formatCurrency(salePrice)}</span>
          </div>
          <div className="PropertyReturns-saleCosts">
            <span>Sale costs: </span>
            <span>{formatCurrency(saleCosts)}</span>
          </div>
          <div className="PropertyReturns-price">
            <span>Purchase price: </span>
            <span>{formatCurrency(price)}</span>
          </div>
          <div className="PropertyReturns-costs">
            <span>Purchase costs: </span>
            <span>{formatCurrency(purchaseCosts)}</span>
          </div>
          <div className="PropertyReturns-mortgagePayments">
            <span>Mortgage payments: </span>
            <span>{formatCurrency(totalMortgagePayment)}</span>
          </div>
          <div className="PropertyReturns-rentalIncome">
            <span>Rental income: </span>
            <span>{formatCurrency(totalRentalIncome)}</span>
          </div>
          <div className="PropertyReturns-holdPeriod">
            <span>Hold period: </span>
            <span>{`${holdPeriod} years`}</span>
          </div>
          <div className="PropertyReturns-holdPeriod">
            <span>Growth (p/a): </span>
            <span>{`${growth}%`}</span>
          </div>
          <div className="PropertyReturns-buyToLet">
            <span>Buy to let: </span>
            <span>{buyToLet ? 'Yes' : 'No'}</span>
          </div>
          <div className="PropertyReturns-stamDuty">
            <span>Stamp duty: </span>
            <span>{`${stampDuty}%`}</span>
          </div>
        </div>
        <div className="PropertyReturns-column">
          {this.state.fiveYearGrowth ?
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
            : null
          }
        </div>
      </div>
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
  propertyListings: PropTypes.object,
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
  propertyListings: state.propertyListings,
});

export default connect(
  mapStateToProps,
)(PropertyReturns);
